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

      case 'getBookingById':
        return Bookings.handleGetBookingById(e)

      case 'updateBookingStatus':
        return Bookings.handleUpdateBookingStatus(e)

      case 'deleteBooking':
        return Bookings.handleDeleteBooking(e)

      // Messages endpoints
      case 'saveMessage':
        return Messages.handleSaveMessage(e)

      case 'getMessages':
        return Messages.handleGetMessages(e)

      case 'getMessageById':
        return Messages.handleGetMessageById(e)

      case 'updateMessageStatus':
        return Messages.handleUpdateMessageStatus(e)

      case 'deleteMessage':
        return Messages.handleDeleteMessage(e)

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
      protected: [
        'login',
        'verify',
        'getBookings',
        'getBookingById',
        'updateBookingStatus',
        'getMessages',
        'updateMessageStatus'
      ]
    }
  })
}
