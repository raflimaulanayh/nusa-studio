---
description: Create and Deploy Google Apps Script for Booking Form
---

This workflow guides you through setting up a Google Apps Script to receive form submissions from the Nusa Studio booking page.

# 1. Create a Google Sheet

1. Open [Google Sheets](https://sheets.google.com).
2. Create a new "Blank spreadsheet".
3. Name it "Nusa Studio Bookings".
4. Add the following headers to the first row (Row 1):
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Phone`
   - Column E: `Company`
   - Column F: `Service`
   - Column G: `Budget`
   - Column H: `Message`

# 2. Open Apps Script

1. In the Google Sheet, go to **Extensions** > **Apps Script**.
2. Rename the project (top left) to "Booking Form Script".

# 3. Add the Code

1. Delete any code in the `Code.gs` file.
2. Paste the following code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

  // Get data from request parameters
  // Ensure your form sends these keys
  var timestamp = new Date()
  var name = e.parameter.name
  var email = e.parameter.email
  var phone = e.parameter.phone
  var company = e.parameter.company
  var service = e.parameter.service
  var budget = e.parameter.budget
  var message = e.parameter.message

  // Append row to sheet
  sheet.appendRow([timestamp, name, email, phone, company, service, budget, message])

  // Return success result
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(ContentService.MimeType.JSON)
}
```

# 4. Deploy the Script

1. Click **Deploy** (blue button, top right) > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. **Description**: "v1" (or anything you like).
4. **Execute as**: `Me (your_email@gmail.com)`.
5. **Who has access**: `Anyone` (This is CRITICAL - allow anonymous access so your website can send data without login).
6. Click **Deploy**.
7. Authorize the script if prompted (Review permissions > Choose account > Advanced > Go to... (unsafe) > Allow).
8. Copy the **Web app URL**. It ends with `/exec`.

# 5. Update the Website Code

1. Open `src/app/(public)/book/page.tsx` in your editor.
2. Find `const GOOGLE_SCRIPT_URL = '...'`.
3. Replace the placeholder URL with your new **Web app URL** from step 4.
4. Save the file.

# 6. Test

1. Go to your local Booking Page (`http://localhost:3000/book`).
2. Fill out the form.
3. Submit.
4. Check your Google Sheet to see the new row appear!
