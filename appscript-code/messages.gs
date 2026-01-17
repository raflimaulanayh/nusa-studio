// ========================================================================
// MESSAGES.GS - Contact Messages Management
// ========================================================================
const Messages = {
  /**
   * Generate ticket number: MSG-YYMMDD-XXX
   */
  generateTicketNumber: function () {
    const now = new Date()
    const year = now.getFullYear().toString().slice(-2)
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const day = ('0' + now.getDate()).slice(-2)
    const datePrefix = `MSG-${year}${month}${day}`

    try {
      const sheet = Utils.getSheet(Config.MESSAGES_SHEET_NAME)
      const data = sheet.getDataRange().getValues()

      let maxNumber = 0

      // Skip header row, start from row 1 (index 1)
      for (let i = 1; i < data.length; i++) {
        const ticketNum = data[i][0] // Column A (ticket number)

        // Convert to string and check if it starts with today's prefix
        if (ticketNum) {
          const ticketNumStr = ticketNum.toString()
          if (ticketNumStr.startsWith(datePrefix)) {
            const parts = ticketNumStr.split('-')
            if (parts.length === 3) {
              const num = parseInt(parts[2])
              if (num > maxNumber) maxNumber = num
            }
          }
        }
      }

      const nextNumber = ('00' + (maxNumber + 1)).slice(-3)
      return `${datePrefix}-${nextNumber}`
    } catch (error) {
      Utils.log(`Ticket number generation error: ${error.toString()}`, 'ERROR')
      // Fallback: use timestamp-based number
      const timestamp = now.getTime().toString().slice(-3)
      return `${datePrefix}-${timestamp}`
    }
  },

  /**
   * Save contact form message (PUBLIC - No auth required)
   */
  handleSaveMessage: function (e) {
    const name = Security.sanitizeInput(e.parameter.name)
    const email = Security.sanitizeInput(e.parameter.email)
    const service = Security.sanitizeInput(e.parameter.service)
    const message = Security.sanitizeInput(e.parameter.message)

    if (!name || !email || !message) {
      return Utils.createResponse({ error: 'Name, email, and message are required' }, 400)
    }

    if (!Security.isValidEmail(email)) {
      return Utils.createResponse({ error: 'Invalid email format' }, 400)
    }

    try {
      // Generate ticket number
      const ticketNumber = this.generateTicketNumber()
      Utils.log('Generated ticket number: ' + ticketNumber, 'INFO')

      const sheet = Utils.getSheet(Config.MESSAGES_SHEET_NAME)
      const timestamp = new Date()

      // Save to sheet with ticket number
      sheet.appendRow([
        ticketNumber, // A: Ticket Number
        timestamp, // B: Timestamp
        name, // C: Name
        email, // D: Email
        service || 'General Inquiry', // E: Service
        message, // F: Message
        'New' // G: Status
      ])

      Utils.log(`Message saved: ${ticketNumber} from ${name} (${email})`, 'INFO')

      return Utils.createResponse({
        success: true,
        message: 'Message sent successfully',
        ticketNumber: ticketNumber
      })
    } catch (error) {
      Utils.log(`Save message error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to save message' }, 500)
    }
  },

  /**
   * Get all messages (PROTECTED - Admin only)
   */
  handleGetMessages: function (e) {
    const token = e.parameter.token
    const auth = Auth.authorizeRequest(token)

    if (!auth.authorized) {
      return Utils.createResponse({ error: auth.error }, 401)
    }

    try {
      const sheet = Utils.getSheet(Config.MESSAGES_SHEET_NAME)
      const data = sheet.getDataRange().getValues()

      if (data.length <= 1) {
        return Utils.createResponse({ success: true, messages: [], total: 0 })
      }

      const messages = []
      for (let i = 1; i < data.length; i++) {
        const row = data[i]
        messages.push({
          ticketNumber: row[0], // Column A
          timestamp: row[1], // Column B
          name: row[2], // Column C
          email: row[3], // Column D
          service: row[4], // Column E
          message: row[5], // Column F
          status: row[6] || 'New', // Column G
          rowIndex: i + 1 // Actual row index
        })
      }

      return Utils.createResponse({ success: true, messages: messages.reverse(), total: messages.length })
    } catch (error) {
      Utils.log(`Get messages error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to fetch messages' }, 500)
    }
  },

  /**
   * Update message status (PROTECTED - Admin only)
   */
  handleUpdateMessageStatus: function (e) {
    const token = e.parameter.token
    const rowIndex = parseInt(e.parameter.rowIndex)
    const status = Security.sanitizeInput(e.parameter.status)

    const auth = Auth.authorizeRequest(token)
    if (!auth.authorized) {
      return Utils.createResponse({ error: auth.error }, 401)
    }

    if (!rowIndex || !status) {
      return Utils.createResponse({ error: 'Row index and status required' }, 400)
    }

    const validStatuses = ['New', 'Read', 'Replied']
    if (!validStatuses.includes(status)) {
      return Utils.createResponse({ error: 'Invalid status. Use: New, Read, or Replied' }, 400)
    }

    try {
      const sheet = Utils.getSheet(Config.MESSAGES_SHEET_NAME)
      // Column G = Status (was column 6, now column 7 with ticket number)
      sheet.getRange(rowIndex, 7).setValue(status)

      return Utils.createResponse({ success: true, message: 'Status updated successfully' })
    } catch (error) {
      Utils.log(`Update message status error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to update status' }, 500)
    }
  }
}
