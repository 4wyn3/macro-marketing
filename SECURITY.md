# Security Documentation

This document outlines the security measures implemented in the Macro Marketing website.

## Security Headers

The website implements comprehensive security headers to protect against common web vulnerabilities:

### HTTP Security Headers

1. **X-Content-Type-Options: nosniff**
   - Prevents MIME type sniffing attacks
   - Forces browsers to respect declared content types

2. **X-Frame-Options: DENY**
   - Prevents clickjacking attacks
   - Blocks the site from being embedded in iframes

3. **X-XSS-Protection: 1; mode=block**
   - Enables browser XSS filtering
   - Blocks pages when XSS attacks are detected

4. **Referrer-Policy: strict-origin-when-cross-origin**
   - Controls referrer information sent with requests
   - Protects user privacy

5. **Permissions-Policy**
   - Restricts access to browser features (geolocation, microphone, camera)
   - Prevents unauthorized access to sensitive APIs

### Content Security Policy (CSP)

The CSP is configured to:
- Allow scripts only from the same origin
- Restrict styles to self and Google Fonts
- Allow fonts from self and Google Fonts
- Restrict images to self, data URIs, and blob URLs
- Block inline scripts and styles (with necessary exceptions for Vite)
- Prevent frame embedding
- Upgrade insecure requests to HTTPS

**Note:** The CSP includes `'unsafe-inline'` and `'unsafe-eval'` for scripts due to Vite's development requirements. In production, consider tightening this policy.

## Input Validation and Sanitization

### Contact Form Security

The contact form implements multiple layers of security:

1. **Input Sanitization**
   - All user inputs are sanitized to prevent XSS attacks
   - Removes potentially dangerous characters and HTML tags
   - Strips JavaScript event handlers

2. **Input Validation**
   - **Name**: Validates length (2-100 characters) and format (letters, spaces, hyphens, apostrophes)
   - **Email**: Validates RFC 5322 compliant email format
   - **Message**: Validates length (10-5000 characters)

3. **Rate Limiting**
   - Client-side rate limiting prevents spam
   - Maximum 5 submissions per minute per user
   - Uses localStorage for tracking (client-side only)

4. **Form Attributes**
   - `maxLength` attributes prevent buffer overflow attacks
   - `aria-invalid` and `aria-describedby` for accessibility
   - Proper error handling and user feedback

## XSS Protection

### Sanitization Functions

The `src/utils/security.js` file provides:
- `sanitizeInput()`: Removes dangerous characters and HTML tags
- `sanitizeFormData()`: Sanitizes entire form objects
- Input validation functions for all form fields

### React Security

- React automatically escapes values in JSX, providing built-in XSS protection
- All user inputs are sanitized before being rendered
- No `dangerouslySetInnerHTML` is used in the codebase

## External Links Security

All external links use:
- `rel="noopener noreferrer"` to prevent tabnabbing attacks
- `target="_blank"` with proper security attributes

## Dependency Security

### Recommended Practices

1. **Regular Updates**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Security Scanning**
   - Run `npm audit` regularly
   - Check for known vulnerabilities
   - Update dependencies promptly

3. **Dependency Management**
   - Pin dependency versions in `package-lock.json`
   - Review dependency updates before applying
   - Use `npm ci` in production builds

## Production Deployment Security

### Server Configuration

When deploying to production, ensure your web server (Nginx, Apache, etc.) includes:

```nginx
# Security Headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Content Security Policy
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' https://www.linkedin.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;" always;

# HTTPS Only
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### HTTPS

- Always use HTTPS in production
- Configure HSTS (HTTP Strict Transport Security)
- Use valid SSL/TLS certificates
- Redirect HTTP to HTTPS

### Environment Variables

- Never commit `.env` files to version control
- Use environment variables for sensitive data
- Rotate secrets regularly
- Use different credentials for development and production

## Security Best Practices

### Code Security

1. **Never trust user input** - Always validate and sanitize
2. **Use parameterized queries** - When connecting to a database
3. **Implement CSRF protection** - For form submissions
4. **Use secure authentication** - If adding user accounts
5. **Log security events** - Monitor for suspicious activity

### Monitoring

1. **Error Logging** - Monitor for unusual errors
2. **Rate Limiting** - Implement server-side rate limiting
3. **Intrusion Detection** - Monitor for attack patterns
4. **Regular Audits** - Review security measures periodically

## Reporting Security Issues

If you discover a security vulnerability, please:
1. Do not create a public GitHub issue
2. Contact the development team directly
3. Provide detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Security Checklist

- [x] Security headers implemented
- [x] Content Security Policy configured
- [x] Input validation and sanitization
- [x] XSS protection
- [x] External link security
- [x] Rate limiting (client-side)
- [x] Error handling
- [ ] Server-side rate limiting (requires backend)
- [ ] CSRF tokens (requires backend)
- [ ] Security monitoring (requires infrastructure)
- [ ] Regular security audits

## Future Enhancements

1. **Backend Integration**
   - Server-side validation
   - Server-side rate limiting
   - CSRF token implementation
   - Secure API endpoints

2. **Advanced Security**
   - Web Application Firewall (WAF)
   - DDoS protection
   - Security monitoring and alerting
   - Regular penetration testing

3. **Compliance**
   - GDPR compliance (if handling EU data)
   - Privacy policy implementation
   - Cookie consent management

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#security)

