import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import heroVideo from '../../vids/leadersMeeting2025.mp4'

function Home() {
  const [isVisible, setIsVisible] = useState({})
  const [counters, setCounters] = useState({ clients: 0, years: 0, satisfaction: 0, revenue: '$0' })
  const statsRef = useRef(null)
  const slides = [
    { src: '/imgs/mozaikOrg.jpg', caption: 'Our Organization' },
    { src: '/imgs/gala2023.jpg', caption: 'Gala 2023' },
    { src: '/imgs/macroCEO.jpg', caption: 'Leadership' },
    { src: '/imgs/mozaikOffice.jpg', caption: 'Our People' },
    { src: '/imgs/mehdiLeadersPin.jpg', caption: 'Recognition' }
  ]
  const [currentSlide, setCurrentSlide] = useState(0)

  // Typing effect state
  const words = ['business owner', 'great leader', 'goal setter', 'legacy builder', 'resilient striver', 'peak achiever']
  const [typingText, setTypingText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    // Animate hero section immediately on load
    const heroElements = document.querySelectorAll('.hero .animate-on-load-01')
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 100)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || entry.target.closest('section')?.id
            if (id) {
              setIsVisible((prev) => ({ ...prev, [id]: true }))
            }
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const statsSection = document.getElementById('stats')
    if (statsSection) {
      observer.observe(statsSection)
    }

    const elements = document.querySelectorAll('.fade-in, .slide-in, .animate-on-load-01')
    elements.forEach((el) => {
      // Skip hero elements as they're handled above
      if (!el.closest('.hero')) {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(id)
  }, [slides.length])

  useEffect(() => {
    if (isVisible.stats) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      const animateCounter = (key, target, suffix = '') => {
        let current = 0
        const increment = target / steps
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCounters((prev) => ({ ...prev, [key]: target + suffix }))
            clearInterval(timer)
          } else {
            setCounters((prev) => ({ ...prev, [key]: Math.floor(current) + suffix }))
          }
        }, interval)
      }

      animateCounter('clients', 1500, '+')
      animateCounter('years', 10, '+')
      animateCounter('satisfaction', 92, '%')

      // Revenue counter with dollar formatting
      let revenueCurrent = 0
      const revenueTarget = 10000000
      const revenueIncrement = revenueTarget / steps
      const revenueTimer = setInterval(() => {
        revenueCurrent += revenueIncrement
        if (revenueCurrent >= revenueTarget) {
          setCounters((prev) => ({ ...prev, revenue: '$10,000,000+' }))
          clearInterval(revenueTimer)
        } else {
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(Math.floor(revenueCurrent))
          setCounters((prev) => ({ ...prev, revenue: formatted }))
        }
      }, interval)
    }
  }, [isVisible.stats])

  // Typing effect
  useEffect(() => {
    const currentWord = words[currentWordIndex]
    let speed = 100

    if (!isDeleting) {
      // Typing forward
      if (typingText.length < currentWord.length) {
        speed = 100
      } else {
        // Finished typing, wait then start deleting
        speed = 2000 // Pause before deleting
      }
    } else {
      // Deleting
      if (typingText.length > 0) {
        speed = 50 // Faster when deleting
      } else {
        // Finished deleting, move to next word
        speed = 500 // Pause before typing next word
      }
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (typingText.length < currentWord.length) {
          setTypingText(currentWord.substring(0, typingText.length + 1))
        } else {
          // Finished typing, start deleting
          setIsDeleting(true)
        }
      } else {
        // Deleting
        if (typingText.length > 0) {
          setTypingText(typingText.substring(0, typingText.length - 1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [typingText, currentWordIndex, isDeleting, words])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <video className="hero-bg-video" src={heroVideo} autoPlay muted loop playsInline></video>
        <div className="container">
          <div className="hero-content animate-on-load-01">
            <h1
              className="hero-title animate-on-load-01"
              style={{
                transitionDelay: '0.1s'
              }}
            >
              <span className="hero-title-line1">Become the</span>
              <br />
              <span className="hero-title-line2">
                next{' '}
                <span className="typing-text">
                  {typingText}
                  <span className="typing-cursor">|</span>
                </span>
              </span>
            </h1>
            <p className="hero-subtitle animate-on-load-01" style={{ transitionDelay: '0.2s' }}>
              We help businesses achieve exceptional sales results through proven strategies,
              expert training, and cutting-edge solutions.
            </p>
            <div className="hero-buttons animate-on-load-01" style={{ transitionDelay: '0.3s' }}>
              <Link
                to="/contact"
                className="btn btn-secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider with Stats Overlay */}
      <section className="slider-stats-section" id="gallery">
        <div className="slider-background">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((s, i) => (
              <figure className="slide" key={i}>
                <img src={s.src} alt={s.caption} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>

        {/* Stats Box with Glassy Effect */}
        <div className="stats-overlay-container">
          <div className="stats-glass-box" id="stats" ref={statsRef}>
            <div className="stats-grid">
              <div className="stat-item animate-on-load-01" style={{ transitionDelay: '0.1s' }}>
                <div className="stat-number">{counters.clients}</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item animate-on-load-01" style={{ transitionDelay: '0.2s' }}>
                <div className="stat-number">{counters.years}</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item animate-on-load-01" style={{ transitionDelay: '0.3s' }}>
                <div className="stat-number">{counters.satisfaction}</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item animate-on-load-01" style={{ transitionDelay: '0.4s' }}>
                <div className="stat-number stat-number-revenue">{counters.revenue}</div>
                <div className="stat-label">Revenue Generated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-cta">
        <div className="container">
          <Link
            to="/contact"
            className="contact-cta-link animate-on-load-01"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

