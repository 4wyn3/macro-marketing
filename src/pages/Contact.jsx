import { useState, useEffect } from 'react'
import './Contact.css'
import { 
  sanitizeInput, 
  validateEmail, 
  validateName, 
  validateMessage, 
  checkRateLimit,
  sanitizeFormData 
} from '../utils/security'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-load-01')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Sanitize input on change
    const sanitizedValue = sanitizeInput(value)
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validate name
    const nameValidation = validateName(formData.name)
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.error
    }
    
    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Validate message
    const messageValidation = validateMessage(formData.message)
    if (!messageValidation.valid) {
      newErrors.message = messageValidation.error
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check rate limiting
    if (!checkRateLimit('contact-form-submissions', 5, 60000)) {
      setErrors({ 
        submit: 'Too many submission attempts. Please wait a minute before trying again.' 
      })
      return
    }
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Sanitize all form data before submission
      const sanitizedData = sanitizeFormData(formData)
      
      // Send email using Formspree
      // Replace 'YOUR_FORM_ID' with your Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizedData.name,
          email: sanitizedData.email,
          message: sanitizedData.message,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      // Success - show message
      alert('Thank you for your message! We will get back to you soon.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      setErrors({})
      
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ 
        submit: 'An error occurred. Please try again later.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-left">
          <h1 className="contact-title animate-on-load-01">Get in Touch<span className="asterisk">*</span></h1>
          <p className="contact-description animate-on-load-01" style={{ transitionDelay: '0.1s' }}>
            At MacroMarketing, we hire restless doers who refuse to settle for ordinary. We run on grit, straight talk, and relentless execution. If you're hungry to sell, lead, and own your future, you'll fit right in. We give you real training, real responsibility, and a clear path to run teams and build something lasting. Join us and turn ambition into results.
          </p>
          
          <div className="contact-info-items">
            <a href="mailto:admin@macro-marketing.com" className="contact-info-link animate-on-load-01" style={{ transitionDelay: '0.2s' }}>
              <span className="icon">✉</span> admin@macro-marketing.com
            </a>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group animate-on-load-01" style={{ transitionDelay: '0.4s' }}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group animate-on-load-01" style={{ transitionDelay: '0.5s' }}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={254}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group animate-on-load-01" style={{ transitionDelay: '0.6s' }}>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={5000}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && <span id="message-error" className="error-message" role="alert">{errors.message}</span>}
            </div>

            {errors.submit && (
              <div className="error-message submit-error" role="alert">
                {errors.submit}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn animate-on-load-01" 
              style={{ transitionDelay: '0.7s' }}
              disabled={isSubmitting}
            >
              <span className="arrow-icon">↳</span> {isSubmitting ? 'Sending...' : 'Get in touch'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

