# Messages API - AppScript Implementation Guide

## Google Sheets Structure

**Sheet Name:** `Messages`

**Columns:**

```
A: Timestamp
B: Name
C: Email
D: Service
E: Message
F: Status (New/Read/Replied)
G: Row Index
```

---

## AppScript Actions

### 1. saveMessage (Public - No Auth)

**Purpose:** Save contact form submission to Messages sheet

**Parameters:**

```
action: 'saveMessage'
name: string
email: string
service: string
message: string
```

**Implementation:**

```javascript
function saveMessage(name, email, service, message) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages')
  const timestamp = new Date()
  const lastRow = sheet.getLastRow()
  const rowIndex = lastRow + 1

  sheet.appendRow([timestamp, name, email, service || 'General Inquiry', message, 'New', rowIndex])

  return {
    success: true,
    message: 'Message saved successfully'
  }
}
```

---

### 2. getMessages (Admin - Auth Required)

**Purpose:** Get all messages for admin panel

**Parameters:**

```
action: 'getMessages'
token: string (JWT from NextAuth)
```

**Returns:**

```json
{
  "messages": [
    {
      "rowIndex": 2,
      "timestamp": "2026-01-17T10:00:00",
      "name": "John Doe",
      "email": "john@example.com",
      "service": "Web Development",
      "message": "I need a website...",
      "status": "New"
    }
  ],
  "success": true,
  "total": 1
}
```

**Implementation:**

```javascript
function getMessages(token) {
  if (!verifyToken(token)) {
    return { error: 'Unauthorized', success: false }
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages')
  const data = sheet.getDataRange().getValues()

  // Skip header row
  const messages = data.slice(1).map((row, index) => ({
    rowIndex: index + 2, // +2 because Excel is 1-indexed and we skip header
    timestamp: row[0],
    name: row[1],
    email: row[2],
    service: row[3],
    message: row[4],
    status: row[5] || 'New'
  }))

  return {
    success: true,
    messages: messages.reverse(), // Latest first
    total: messages.length
  }
}
```

---

### 3. updateMessageStatus (Admin - Auth Required)

**Purpose:** Update message status (New → Read → Replied)

**Parameters:**

```
action: 'updateMessageStatus'
token: string (JWT from NextAuth)
rowIndex: number
status: string (New/Read/Replied)
```

**Implementation:**

```javascript
function updateMessageStatus(token, rowIndex, status) {
  if (!verifyToken(token)) {
    return { error: 'Unauthorized', success: false }
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages')

  // Column F (6) is Status
  sheet.getRange(rowIndex, 6).setValue(status)

  return {
    success: true,
    message: 'Status updated'
  }
}
```

---

## Main doPost Handler

```javascript
function doPost(e) {
  try {
    const params = e.parameter
    const action = params.action

    switch (action) {
      case 'saveMessage':
        return ContentService.createTextOutput(
          JSON.stringify(saveMessage(params.name, params.email, params.service, params.message))
        ).setMimeType(ContentService.MimeType.JSON)

      case 'getMessages':
        return ContentService.createTextOutput(JSON.stringify(getMessages(params.token))).setMimeType(
          ContentService.MimeType.JSON
        )

      case 'updateMessageStatus':
        return ContentService.createTextOutput(
          JSON.stringify(updateMessageStatus(params.token, params.rowIndex, params.status))
        ).setMimeType(ContentService.MimeType.JSON)

      default:
        return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' })).setMimeType(
          ContentService.MimeType.JSON
        )
    }
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        error: error.toString(),
        success: false
      })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
```

---

## API Endpoints Created

### Public

✅ `POST /api/messages/send` - Contact form submission (no auth)

### Admin (Auth Required)

✅ `GET /api/messages` - List all messages
✅ `PATCH /api/messages` - Update message status  
✅ `GET /api/messages/stats` - Get statistics

### Hook

✅ `useMessages()` - SWR hook with optimistic updates
✅ `useMessageStatistics()` - Stats for dashboard

---

## Next Steps

1. **Copy AppScript code** to Google Apps Script
2. **Deploy as Web App** (Anyone with link can access)
3. **Update .env.local** with AppScript URL
4. **Test contact form** submission
5. **Test admin panel** message list & status updates
