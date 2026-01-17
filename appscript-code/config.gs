// ========================================================================
// CONFIG.GS - Configuration Constants
// ========================================================================
const Config = {
  // Spreadsheet Configuration
  SPREADSHEET_ID: '1HizlG1xpSUnoSSihHzaFxXwklKzQUOlOZOqJKMRSBQI',
  BOOKINGS_SHEET_NAME: 'Books',
  MESSAGES_SHEET_NAME: 'Messages',
  USERS_SHEET_NAME: 'Users',

  // Security Settings
  MIN_PASSWORD_LENGTH: 8,
  REQUIRE_STRONG_PASSWORD: false, // Set to true for production
  TOKEN_EXPIRY_HOURS: 24, // JWT token expiry

  // Feature Flags
  ENABLE_LOGGING: true,
  ENABLE_EMAIL_NOTIFICATIONS: false
}
