import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'

// Use a fixed encryption key derived from the machine's hostname
// This ensures the token can only be decrypted on the same machine
const getEncryptionKey = () => {
  const hostname = os.hostname()
  return crypto.createHash('sha256').update(hostname).digest()
}

const getTokenPath = () => {
  const homeDir = os.homedir()
  return path.join(homeDir, '.venmowned', 'token')
}

const ensureTokenDir = () => {
  const tokenPath = getTokenPath()
  const tokenDir = path.dirname(tokenPath)
  if (!fs.existsSync(tokenDir)) {
    fs.mkdirSync(tokenDir, { recursive: true, mode: 0o700 })
  }
}

export const setToken = async token => {
  try {
    ensureTokenDir()
    const tokenPath = getTokenPath()

    // Generate a random IV for each encryption
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv)

    let encrypted = cipher.update(token, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Store the IV and encrypted token
    const data = {
      iv: iv.toString('hex'),
      token: encrypted,
      authTag: cipher.getAuthTag().toString('hex')
    }

    fs.writeFileSync(tokenPath, JSON.stringify(data), { mode: 0o600 })
    return true
  } catch (error) {
    console.error('Error saving token:', error.message)
    return false
  }
}

export const getToken = async () => {
  try {
    const tokenPath = getTokenPath()
    if (!fs.existsSync(tokenPath)) {
      return null
    }

    const data = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      getEncryptionKey(),
      Buffer.from(data.iv, 'hex')
    )

    decipher.setAuthTag(Buffer.from(data.authTag, 'hex'))
    let decrypted = decipher.update(data.token, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Error reading token:', error.message)
    return null
  }
}

export const deleteToken = async () => {
  try {
    const tokenPath = getTokenPath()
    if (fs.existsSync(tokenPath)) {
      fs.unlinkSync(tokenPath)
    }
    return true
  } catch (error) {
    console.error('Error deleting token:', error.message)
    return false
  }
}
