// ========================================================================
// UTILS.GS - Utility Functions
// ========================================================================
const Utils = {
  /**
   * Create standardized JSON response
   * @param {object} data - Response data
   * @param {number} status - HTTP status code
   * @returns {ContentService.TextOutput}
   */
  createResponse: function (data, status = 200) {
    const response = {
      ...data,
      timestamp: new Date().toISOString(),
      status: status
    }

    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON)
  },

  /**
   * Log message with timestamp
   * @param {string} message
   * @param {string} level - 'INFO', 'WARN', 'ERROR'
   */
  log: function (message, level = 'INFO') {
    if (!Config.ENABLE_LOGGING) return

    const timestamp = new Date().toISOString()
    Logger.log(`[${level}] [${timestamp}] ${message}`)
  },

  /**
   * Get spreadsheet instance
   * @returns {Spreadsheet}
   */
  getSpreadsheet: function () {
    try {
      return SpreadsheetApp.openById(Config.SPREADSHEET_ID)
    } catch (error) {
      this.log('Failed to open spreadsheet: ' + error.toString(), 'ERROR')
      throw new Error('Database connection failed')
    }
  },

  /**
   * Get sheet by name with error handling
   * @param {string} sheetName
   * @returns {Sheet}
   */
  getSheet: function (sheetName) {
    const ss = this.getSpreadsheet()
    const sheet = ss.getSheetByName(sheetName)

    if (!sheet) {
      throw new Error(`Sheet not found: ${sheetName}`)
    }

    return sheet
  },

  /**
   * Convert sheet data to JSON array
   * @param {Sheet} sheet
   * @returns {Array<object>}
   */
  sheetToJson: function (sheet) {
    const data = sheet.getDataRange().getValues()

    if (data.length === 0) {
      return []
    }

    const headers = data[0]
    const rows = []

    for (let i = 1; i < data.length; i++) {
      const row = {}
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j].toString().toLowerCase()
        row[header] = data[i][j]
      }
      row._rowIndex = i + 1
      rows.push(row)
    }

    return rows
  },

  /**
   * Format date for spreadsheet
   * @param {Date} date
   * @returns {string}
   */
  formatDate: function (date) {
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')
  },

  /**
   * Check if value is empty
   * @param {any} value
   * @returns {boolean}
   */
  isEmpty: function (value) {
    return value === null || value === undefined || value === ''
  }
}
