// ========================================================================
// SECURITY.GS - Security & JWT Authentication
// ========================================================================
const Security = {
  JWT_SECRET: 'nusacaraka-studio-secret-key-2026-change-me',

  generateJWT: function (payload) {
    const header = { alg: 'HS256', typ: 'JWT' }
    const claims = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + Config.TOKEN_EXPIRY_HOURS * 3600,
      jti: Utilities.getUuid()
    }

    const encodedHeader = this._base64UrlEncode(JSON.stringify(header))
    const encodedPayload = this._base64UrlEncode(JSON.stringify(claims))
    const signatureInput = encodedHeader + '.' + encodedPayload
    const signature = this._createSignature(signatureInput)

    return signatureInput + '.' + signature
  },

  verifyJWT: function (token) {
    if (!token) return { valid: false, error: 'Token required' }

    try {
      const parts = token.split('.')
      if (parts.length !== 3) return { valid: false, error: 'Invalid token format' }

      const [encodedHeader, encodedPayload, signature] = parts
      const signatureInput = encodedHeader + '.' + encodedPayload
      const expectedSignature = this._createSignature(signatureInput)

      if (signature !== expectedSignature) return { valid: false, error: 'Invalid signature' }

      const payload = JSON.parse(this._base64UrlDecode(encodedPayload))
      const now = Math.floor(Date.now() / 1000)

      if (payload.exp && now > payload.exp) return { valid: false, error: 'Token expired' }

      return { valid: true, payload: payload }
    } catch (error) {
      return { valid: false, error: 'Token verification failed' }
    }
  },

  _createSignature: function (data) {
    const signature = Utilities.computeHmacSha256Signature(data, this.JWT_SECRET)
    return this._base64UrlEncode(signature)
  },

  _base64UrlEncode: function (data) {
    let encoded = typeof data === 'string' ? Utilities.base64Encode(data) : Utilities.base64Encode(data)
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  },

  _base64UrlDecode: function (encoded) {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) base64 += '='
    const decoded = Utilities.base64Decode(base64)
    return Utilities.newBlob(decoded).getDataAsString()
  },

  hashPassword: function (password) {
    const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password, Utilities.Charset.UTF_8)
    return hash
      .map((byte) => {
        const v = byte < 0 ? 256 + byte : byte
        return ('0' + v.toString(16)).slice(-2)
      })
      .join('')
  },

  verifyPassword: function (password, hash) {
    return this.hashPassword(password) === hash
  },

  isValidEmail: function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  validatePassword: function (password) {
    if (!password || password.length < Config.MIN_PASSWORD_LENGTH) {
      return {
        valid: false,
        error: `Password must be at least ${Config.MIN_PASSWORD_LENGTH} characters`
      }
    }
    return { valid: true }
  },

  sanitizeInput: function (input) {
    if (!input) return ''
    return String(input).trim()
  }
}
