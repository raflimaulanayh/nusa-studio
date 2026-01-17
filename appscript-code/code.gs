// ========================================================================
// CODE.GS - Main Router & Entry Point  
// ========================================================================

function doPost(e) {
  try {
    const action = e.parameter.action

    // Route to appropriate handler
    switch (action) {
      // Auth endpoints
      case 'login':
        return Auth.handleLogin(e)

      case 'verify':
        return Auth.handleVerifyToken(e)

      // Bookings endpoints
      case 'saveBooking':
        return Bookings.handleSaveBooking(e)

      case 'getBookings':
        return Bookings.handleGetBookings(e)

      case 'updateBookingStatus':
        return Bookings.handleUpdateBookingStatus(e)

      // Messages endpoints
      case 'saveMessage':
        return Messages.handleSaveMessage(e)

      case 'getMessages':
        return Messages.handleGetMessages(e)

      case 'updateMessageStatus':
        return Messages.handleUpdateMessageStatus(e)

      default:
        return Utils.createResponse({ error: 'Invalid action: ' + action }, 400)
    }
  } catch (error) {
    Logger.log('doPost Error: ' + error.toString())

    return Utils.createResponse(
      {
        error: 'Internal server error',
        details: error.toString()
      },
      500
    )
  }
}

function doGet(e) {
  return Utils.createResponse({
    message: 'Nusa Creative Studio API v2.1',
    status: 'running',
    modules: ['auth', 'bookings', 'messages'],
    endpoints: {
      public: ['saveBooking', 'saveMessage'],
      protected: ['login', 'verify', 'getBookings', 'updateBookingStatus', 'getMessages', 'updateMessageStatus']
    }
  })
}
