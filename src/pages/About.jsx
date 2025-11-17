import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

function About() {
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

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-fade"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title animate-on-load-01">
            About us
          </h1>
          <p className="about-hero-subtitle animate-on-load-01" style={{ transitionDelay: '0.1s' }}>
            At MacroMarketing, excellence, teamwork, and leadership fuse into one unstoppable force.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-content">
            <div className="services-text animate-on-load-01">
              <h2 style={{ fontFamily: "'VendSans', 'Inter', sans-serif" }}>Excellence</h2>
              <p className="services-subtitle">
                Excellence is the non-negotiable edge that separates MacroMarketing performers who consistently crush quotas from everyone else who merely shows up.
              </p>
              <p className="services-description">
                At MacroMarketing, our team lives excellence every single day. We hold each other to the highest standards because we know consistent execution is what separates good months from record-breaking ones. This shared commitment to doing things right, no shortcuts, is the reason our people keep climbing leaderboards and building careers they're genuinely proud of.
              </p>
            </div>

            <div className="services-images animate-on-load-01" style={{ transitionDelay: '0.2s' }}>
              <img src="/imgs/r&r2023.jpg" alt="Planning" className="services-img services-img-small" />
            </div>
          </div>

          {/* New Bottom Section */}
          <div className="services-content-bottom">
            <div className="services-image-left animate-on-load-01">
              <img src="/imgs/macroTeam.jpg" alt="Team working" className="services-img services-img-large" />
            </div>

            <div className="services-text-right animate-on-load-01" style={{ transitionDelay: '0.2s' }}>
              <h2 style={{ fontFamily: "'VendSans', 'Inter', sans-serif" }}>Teamwork</h2>
              <p className="services-subtitle">
                Success at MacroMarketing comes from relentless collaboration, not isolated talent.
              </p>
              <p className="services-description">
                Every campaign we run, every target we hit, is the result of our team coming together with a shared mission. From morning huddles to late-night strategy sessions, we support each other through the grind, celebrate wins together, and never leave anyone behind. This culture of teamwork isn't just about hitting goals—it's about building something bigger than ourselves, where every voice matters and every contribution counts.
              </p>
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

export default About
