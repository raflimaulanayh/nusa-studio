// ========================================================================
// MESSAGES.GS - Contact Messages Management
// ========================================================================
const Messages = {
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
      const sheet = Utils.getSheet(Config.MESSAGES_SHEET_NAME)
      const timestamp = new Date()
      const lastRow = sheet.getLastRow()
      const rowIndex = lastRow + 1

      sheet.appendRow([timestamp, name, email, service || 'General Inquiry', message, 'New', rowIndex])

      Utils.log(`New message from ${name} (${email})`, 'INFO')

      return Utils.createResponse({ success: true, message: 'Message sent successfully' })
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
          rowIndex: row[6] || i + 1,
          timestamp: row[0],
          name: row[1],
          email: row[2],
          service: row[3],
          message: row[4],
          status: row[5] || 'New'
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
      sheet.getRange(rowIndex, 6).setValue(status)

      return Utils.createResponse({ success: true, message: 'Status updated successfully' })
    } catch (error) {
      Utils.log(`Update message status error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Failed to update status' }, 500)
    }
  }
}
