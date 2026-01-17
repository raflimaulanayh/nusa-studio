// ========================================================================
// AUTH.GS - Authentication Module (JWT-based)
// ========================================================================
const Auth = {
  handleLogin: function (e) {
    const email = Security.sanitizeInput(e.parameter.email)
    const password = e.parameter.password

    if (!email || !password) {
      return Utils.createResponse({ error: 'Email and password required' }, 400)
    }

    if (!Security.isValidEmail(email)) {
      return Utils.createResponse({ error: 'Invalid email format' }, 400)
    }

    try {
      const sheet = Utils.getSheet(Config.USERS_SHEET_NAME)
      const users = Utils.sheetToJson(sheet)
      const user = users.find((u) => u.email === email)

      if (!user) {
        return Utils.createResponse({ error: 'Invalid credentials' }, 401)
      }

      let isPasswordValid = false
      if (user.password.length === 64) {
        isPasswordValid = Security.verifyPassword(password, user.password)
      } else {
        isPasswordValid = password === user.password
        if (isPasswordValid) {
          const hashedPassword = Security.hashPassword(password)
          sheet.getRange(user._rowIndex, 3).setValue(hashedPassword)
        }
      }

      if (!isPasswordValid) {
        return Utils.createResponse({ error: 'Invalid credentials' }, 401)
      }

      const token = Security.generateJWT({
        email: user.email,
        role: user.role,
        userId: user.id,
        name: user.name
      })

      sheet.getRange(user._rowIndex, 7).setValue(new Date())

      return Utils.createResponse({
        success: true,
        token: token,
        user: { id: user.id, email: user.email, role: user.role, name: user.name }
      })
    } catch (error) {
      Utils.log(`Login error: ${error.toString()}`, 'ERROR')
      return Utils.createResponse({ error: 'Authentication failed' }, 500)
    }
  },

  handleVerifyToken: function (e) {
    const verification = Security.verifyJWT(e.parameter.token)

    if (verification.valid) {
      return Utils.createResponse({
        valid: true,
        email: verification.payload.email,
        role: verification.payload.role,
        userId: verification.payload.userId
      })
    }
    return Utils.createResponse({ valid: false, error: verification.error }, 401)
  },

  authorizeRequest: function (token) {
    if (!token) {
      return { authorized: false, error: 'Authorization token required' }
    }

    const verification = Security.verifyJWT(token)
    if (!verification.valid) {
      return { authorized: false, error: verification.error }
    }

    return {
      authorized: true,
      user: {
        email: verification.payload.email,
        role: verification.payload.role,
        userId: verification.payload.userId,
        name: verification.payload.name
      }
    }
  },

  hasRole: function (user, requiredRole) {
    if (!user || !user.role) return false
    if (user.role === 'admin') return true
    return user.role === requiredRole
  }
}
