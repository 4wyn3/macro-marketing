/**
 * Security utilities for input validation and sanitization
 */

/**
 * Sanitizes a string to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return ''
  }
  
  // Remove potentially dangerous characters and HTML tags
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim()
}

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates name input
 * @param {string} name - Name to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' }
  }
  
  const trimmed = name.trim()
  
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' }
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' }
  }
  
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' }
  }
  
  return { valid: true, error: null }
}

/**
 * Validates message input
 * @param {string} message - Message to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' }
  }
  
  const trimmed = message.trim()
  
  if (trimmed.length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' }
  }
  
  if (trimmed.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters' }
  }
  
  return { valid: true, error: null }
}

/**
 * Rate limiting helper (client-side, basic protection)
 * @param {string} key - Storage key
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} - True if within rate limit
 */
export function checkRateLimit(key, maxAttempts = 5, windowMs = 60000) {
  const now = Date.now()
  const stored = localStorage.getItem(key)
  
  if (!stored) {
    localStorage.setItem(key, JSON.stringify({ count: 1, resetTime: now + windowMs }))
    return true
  }
  
  try {
    const data = JSON.parse(stored)
    
    if (now > data.resetTime) {
      // Reset window
      localStorage.setItem(key, JSON.stringify({ count: 1, resetTime: now + windowMs }))
      return true
    }
    
    if (data.count >= maxAttempts) {
      return false
    }
    
    data.count++
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    // If parsing fails, reset
    localStorage.setItem(key, JSON.stringify({ count: 1, resetTime: now + windowMs }))
    return true
  }
}

/**
 * Sanitizes form data object
 * @param {object} formData - Form data object
 * @returns {object} - Sanitized form data
 */
export function sanitizeFormData(formData) {
  const sanitized = {}
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

