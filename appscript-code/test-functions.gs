// ========================================================================
// TEST FUNCTIONS - For Apps Script Editor Testing
// ========================================================================

/**
 * Test booking submission with email notification
 * Run this in Apps Script Editor to test before integrating with Next.js
 */
function testAddBooking() {
  const testData = {
    parameter: {
      name: 'Cruz Juarez',
      email: 'test@mailinator.com', // Use mailinator untuk test
      phone: '081234567890',
      company: 'Test Company Inc',
      service: 'Web Development',
      budget: 'Rp 5 Juta - Rp 15 Juta',
      message: 'Saya ingin membuat website portfolio untuk bisnis saya. Butuh fitur gallery dan contact form.'
    }
  }

  Logger.log('=== Testing Booking Submission ===')

  const result = Bookings.handleSaveBooking(testData)

  Logger.log('Result:', result.getContent())

  const response = JSON.parse(result.getContent())

  if (response.success) {
    Logger.log('✅ SUCCESS!')
    Logger.log('Order Number:', response.orderNumber)
    Logger.log('Email Sent:', response.emailSent)
  } else {
    Logger.log('❌ FAILED!')
    Logger.log('Error:', response.error)
  }

  return response
}

/**
 * Test order number generation
 */
function testOrderNumberGeneration() {
  Logger.log('=== Testing Order Number Generation ===')

  for (let i = 0; i < 3; i++) {
    const orderNum = Bookings.generateOrderNumber()
    Logger.log(`Test ${i + 1}: ${orderNum}`)
  }
}

/**
 * Test email sending only (without saving to sheet)
 */
function testEmailOnly() {
  const testOrderData = {
    orderNumber: 'NCS-260117-999',
    name: 'Test Customer',
    email: 'test@mailinator.com', // Check mailinator.com inbox
    service: 'Web Development',
    budget: 'Rp 5 Juta - Rp 15 Juta',
    phone: '081234567890',
    company: 'Test Company',
    message: 'This is a test booking message'
  }

  Logger.log('=== Testing Email Notification ===')
  Logger.log('Sending email to:', testOrderData.email)

  const emailSent = Bookings.sendConfirmationEmail(testOrderData)

  if (emailSent) {
    Logger.log('✅ Email sent successfully!')
    Logger.log('Check inbox at: https://www.mailinator.com/v4/public/inboxes.jsp?to=test')
  } else {
    Logger.log('❌ Email failed to send')
  }

  return emailSent
}

/**
 * View latest bookings from sheet
 */
function viewLatestBookings() {
  Logger.log('=== Latest Bookings ===')

  const sheet = Utils.getSheet(Config.BOOKINGS_SHEET_NAME)
  const data = sheet.getDataRange().getValues()

  // Show last 3 bookings
  const start = Math.max(1, data.length - 3)

  for (let i = start; i < data.length; i++) {
    const row = data[i]
    Logger.log(`\nBooking #${i}:`)
    Logger.log('  Order Number:', row[1])
    Logger.log('  Name:', row[2])
    Logger.log('  Email:', row[3])
    Logger.log('  Service:', row[6])
    Logger.log('  Status:', row[9])
  }
}
