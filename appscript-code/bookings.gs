// ========================================================================
// BOOKINGS.GS - Bookings Management
// ========================================================================
const Bookings = {
  /**
   * Generate order number: NCS-YYMMDD-XXX
   */
  generateOrderNumber: function () {
    const now = new Date()
    const year = now.getFullYear().toString().slice(-2)
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const day = ('0' + now.getDate()).slice(-2)
    const datePrefix = `NCS-${year}${month}${day}`

    // Get today's bookings to find next number
    const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
    const data = sheet.getDataRange().getValues()

    let maxNumber = 0
    for (let i = 1; i < data.length; i++) {
      const orderNum = data[i][0]
      if (orderNum && orderNum.startsWith(datePrefix)) {
        const num = parseInt(orderNum.split('-')[2])
        if (num > maxNumber) maxNumber = num
      }
    }

    const nextNumber = ('00' + (maxNumber + 1)).slice(-3)
    return `${datePrefix}-${nextNumber}`
  },

  /**
   * Send confirmation email to customer
   */
  sendConfirmationEmail: function (orderData) {
    const { orderNumber, name, email } = orderData

    const subject = `Booking Confirmation - ${orderNumber} | Nusa Creative Studio`
    const htmlBody = EmailTemplates.getBookingConfirmation(orderData)
    const plainText = EmailTemplates.getBookingConfirmationPlainText(orderData)

    try {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: plainText, // Plain text fallback
        htmlBody: htmlBody // HTML version
      })
      Utils.log(`Confirmation email sent to ${email} for ${orderNumber}`, 'INFO')
      return true
    } catch (error) {
      Utils.log(`Failed to send email to ${email}: ${error.toString()}`, 'ERROR')
      return false
    }
  },

  /**
   * Save booking from public form (PUBLIC - No auth required)
   */
  handleSaveBooking: function (e) {
    try {
      Utils.log('Incoming booking data: ' + JSON.stringify(e.parameter), 'INFO')

      const name = Security.sanitizeInput(e.parameter.name)
      const email = Security.sanitizeInput(e.parameter.email)
      const phone = Security.sanitizeInput(e.parameter.phone)
      const company = Security.sanitizeInput(e.parameter.company)
      const service = Security.sanitizeInput(e.parameter.service)
      const budget = Security.sanitizeInput(e.parameter.budget)
      const message = Security.sanitizeInput(e.parameter.message)

      if (!name || !email || !phone || !service || !budget || !message) {
        return Utils.createResponse({ error: 'Required fields missing' }, 400)
      }

      if (!Security.isValidEmail(email)) {
        return Utils.createResponse({ error: 'Invalid email format' }, 400)
      }

      // Generate order number
      const orderNumber = this.generateOrderNumber()
      Utils.log('Generated order number: ' + orderNumber, 'INFO')

      const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
      const timestamp = new Date()

      // Save to sheet with order number
      const rowData = [
        orderNumber, // A: Order Number
        timestamp, // B: Timestamp
        name, // C: Name
        email, // D: Email
        phone, // E: Phone
        company || '', // F: Company
        service, // G: Service
        budget, // H: Budget
        message, // I: Message
        'New' // J: Status
      ]

      sheet.appendRow(rowData)
      Utils.log(`Booking saved: ${orderNumber}`, 'INFO')

      // Send confirmation email
      const emailSent = this.sendConfirmationEmail({
        orderNumber,
        name,
        email,
        service,
        budget,
        phone,
        company,
        message
      })

      return Utils.createResponse({
        success: true,
        message: 'Booking submitted successfully',
        orderNumber: orderNumber,
        emailSent: emailSent
      })
    } catch (error) {
      Utils.log(`Save booking error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse(
        {
          error: 'Failed to save booking',
          details: error.toString()
        },
        500
      )
    }
  },

  /**
   * Get single booking by ID (requires valid JWT)
   */
  handleGetBookingById: function (e) {
    const token = e.parameter.token
    const rowIndex = parseInt(e.parameter.rowIndex)
    const orderNumber = e.parameter.orderNumber

    const auth = Auth.authorizeRequest(token)
    if (!auth.authorized) {
      return Utils.createResponse({ error: auth.error }, 401)
    }

    if (!rowIndex && !orderNumber) {
      return Utils.createResponse({ error: 'rowIndex or orderNumber required' }, 400)
    }

    try {
      const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
      const data = sheet.getDataRange().getValues()

      if (data.length <= 1) {
        return Utils.createResponse({ error: 'Booking not found' }, 404)
      }

      let foundRow = null
      let foundRowIndex = null

      // Search by rowIndex or orderNumber
      for (let i = 1; i < data.length; i++) {
        const currentOrderNumber = data[i][0] // Column A
        const currentRowIndex = i + 1

        if ((rowIndex && currentRowIndex === rowIndex) || (orderNumber && currentOrderNumber === orderNumber)) {
          foundRow = data[i]
          foundRowIndex = currentRowIndex
          break
        }
      }

      if (!foundRow) {
        return Utils.createResponse({ error: 'Booking not found' }, 404)
      }

      const booking = {
        rowIndex: foundRowIndex,
        order_number: foundRow[0],
        timestamp: foundRow[1],
        name: foundRow[2],
        email: foundRow[3],
        phone: foundRow[4],
        company: foundRow[5],
        service: foundRow[6],
        budget: foundRow[7],
        message: foundRow[8],
        status: foundRow[9] || 'New'
      }

      return Utils.createResponse({ success: true, booking: booking })
    } catch (error) {
      Utils.log(`Get booking by ID error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to fetch booking' }, 500)
    }
  },

  /**
   * Get all bookings (requires valid JWT)
   */
  handleGetBookings: function (e) {
    const token = e.parameter.token
    const auth = Auth.authorizeRequest(token)

    if (!auth.authorized) {
      return Utils.createResponse({ error: auth.error }, 401)
    }

    try {
      const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
      const bookings = Utils.sheetToJson(sheet)

      const enrichedBookings = bookings
        .map((booking, index) => ({
          ...booking,
          id: index + 1,
          rowIndex: booking._rowIndex
        }))
        .reverse()

      return Utils.createResponse({
        success: true,
        bookings: enrichedBookings,
        total: enrichedBookings.length
      })
    } catch (error) {
      Utils.log(`Get bookings error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to fetch bookings' }, 500)
    }
  },

  /**
   * Update booking status (requires admin JWT)
   */
  handleUpdateBookingStatus: function (e) {
    const token = e.parameter.token
    const rowIndex = parseInt(e.parameter.rowIndex)
    const status = Security.sanitizeInput(e.parameter.status)

    const auth = Auth.authorizeRequest(token)
    if (!auth.authorized) {
      return Utils.createResponse({ error: auth.error }, 401)
    }

    if (!Auth.hasRole(auth.user, 'admin')) {
      return Utils.createResponse({ error: 'Admin role required' }, 403)
    }

    if (!rowIndex || !status) {
      return Utils.createResponse({ error: 'Row index and status required' }, 400)
    }

    const validStatuses = ['pending', 'contacted', 'in-progress', 'completed', 'cancelled']
    if (!validStatuses.includes(status.toLowerCase())) {
      return Utils.createResponse({ error: 'Invalid status value' }, 400)
    }

    try {
      const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      let statusCol = headers.indexOf('status') + 1

      if (statusCol === 0) {
        statusCol = sheet.getLastColumn() + 1
        sheet.getRange(1, statusCol).setValue('status')
        sheet.getRange(1, statusCol).setFontWeight('bold')
      }

      sheet.getRange(rowIndex, statusCol).setValue(status)

      return Utils.createResponse({ success: true, message: 'Status updated successfully' })
    } catch (error) {
      Utils.log(`Update status error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to update status' }, 500)
    }
  }
}
