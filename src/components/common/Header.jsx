import React, { useRef, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Header = () => {
  const headerRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const hamburgerButtonRef = useRef(null)
  const firstMenuItemRef = useRef(null)
  const lastMenuItemRef = useRef(null)
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll state for subtle background changes
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Unlock body scroll and restore position
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isMobileMenuOpen])

  // Focus management and keyboard navigation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Focus first menu item when menu opens
      setTimeout(() => {
        firstMenuItemRef.current?.focus()
      }, 100)
    }
  }, [isMobileMenuOpen])

  // Handle keyboard navigation within menu
  const handleMenuKeyDown = (e) => {
    if (!isMobileMenuOpen) return

    if (e.key === 'Escape') {
      closeMobileMenu()
      return
    }

    if (e.key === 'Tab') {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, a, [tabindex]:not([tabindex="-1"])'
      )
      
      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab (backward)
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab (forward)
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleMenuKeyDown)
    return () => document.removeEventListener('keydown', handleMenuKeyDown)
  }, [isMobileMenuOpen])
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu and restore focus
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    // Restore focus to hamburger button
    setTimeout(() => {
      hamburgerButtonRef.current?.focus()
    }, 100)
  }

  // Handle overlay click to close menu
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMobileMenu()
    }
  }
  useGSAP(() => {
    // Smooth header entrance animation
    gsap.fromTo(headerRef.current,
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8
      }
    )

    // Animate navigation items with stagger
    gsap.fromTo('.nav-item-animate',
      {
        opacity: 0,
        y: -10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 1.2
      }
    )
  }, [])

  const navigationItems = [
    { name: 'Portfolio', href: '/projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // Close mobile menu after navigation
    closeMobileMenu()
  }

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out w-full ${
          isScrolled ? 'backdrop-blur-md bg-black/20' : 'bg-transparent'
        }`}
        style={{ zIndex: isMobileMenuOpen ? 30 : 1000 }}
      >
        {/* Subtle gradient fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent pointer-events-none" />
        
        <div className={`container mx-auto py-4 sm:py-6 lg:py-8 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-50' : 'opacity-100'
        }`}>
          <nav className="flex items-center justify-between relative z-10">
            {/* Logo Area */}
            <div className="nav-item-animate flex-shrink-0">
              <Link 
                to="/"
                className="flex items-center space-x-3 group"
              >
                {/* Logo container - replace logo.png in public folder to change logo */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center micro-bounce">
                  <img 
                    src="/logo.png" 
                    alt="Amoura Works Logo" 
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback if logo file is missing
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder (hidden by default) */}
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Amoura Works Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Mobile fallback
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#D3FD50] to-[#b8e03e] rounded-full flex items-center justify-center glow-accent hidden">
                      <span className="font-[font2] text-black text-sm">A</span>
                    </div>
                  </div>
                </div>
                <span className="font-[font2] text-lg sm:text-xl lg:text-2xl text-white uppercase tracking-wide">
                  Amoura Works
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navigationItems.map((item, index) => (
                <div key={index} className="nav-item-animate">
                  {item.href.startsWith('#') ? (
                    <button
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                     className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group cursor-pointer transition-colors duration-200 ease-out hover:text-gray-200"
                    >
                      {item.name}
                     <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 ease-out group-hover:w-full pointer-events-none will-change-transform" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                     className="nav-link font-[font2] text-sm lg:text-base xl:text-lg text-white uppercase tracking-wide relative group cursor-pointer transition-colors duration-200 ease-out hover:text-gray-200"
                    >
                      {item.name}
                     <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 ease-out group-hover:w-full pointer-events-none will-change-transform" />
                    </Link>
                  )}
                </div>
              ))}

              {/* Become an Affiliate Button */}
              <div className="nav-item-animate">
                <Link
                  to="/affiliate-program"
                 className="affiliate-btn font-[font2] text-xs lg:text-sm xl:text-base text-white uppercase tracking-wide px-4 lg:px-6 py-2 lg:py-3 border border-gray-400 rounded-full transition-all duration-200 ease-out hover:bg-white/10 hover:border-white hover:shadow-lg hover:shadow-white/10 active:scale-95 will-change-transform"
                >
                  Become an Affiliate
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden nav-item-animate">
              <button 
                ref={hamburgerButtonRef}
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex flex-col items-center justify-center space-y-1.5 group p-2 relative z-50 focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-opacity-50 rounded-lg"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-6'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
                <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-6'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleOverlayClick}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        
        {/* Mobile Menu Content */}
        <div 
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-out z-60 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          {/* Menu Header */}
          <div className="pt-20 pb-8 px-6 border-b border-white/10">
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white hover:text-[#D3FD50] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D3FD50] focus:ring-opacity-50 rounded-lg"
              aria-label="Close menu"
            >
              <span className="text-2xl">×</span>
            </button>
            
            <div className="flex items-center justify-center">
              <span 
                id="mobile-menu-title"
                className="font-[font2] text-xl text-white uppercase tracking-wide text-center"
              >
                Amoura Works
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-6 py-8 space-y-6">
            {navigationItems.map((item, index) => (
              <div key={index} className="mobile-nav-item">
                {item.href.startsWith('#') ? (
                  <button
                    ref={index === 0 ? firstMenuItemRef : null}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="w-full text-left font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-[#D3FD50] focus:bg-white/5 focus:text-[#D3FD50] focus:outline-none relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-300 group-hover:w-8" />
                  </button>
                ) : (
                  <Link
                    ref={index === 0 ? firstMenuItemRef : null}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className="block font-[font2] text-lg text-white uppercase tracking-wide py-3 px-4 rounded-lg transition-all duration-300 hover:bg-white/5 hover:text-[#D3FD50] focus:bg-white/5 focus:text-[#D3FD50] focus:outline-none relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-4 w-0 h-0.5 bg-[#D3FD50] transition-all duration-300 group-hover:w-8" />
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Affiliate Button */}
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/affiliate-program"
                ref={lastMenuItemRef}
                onClick={closeMobileMenu}
                className="block w-full text-center font-[font2] text-sm text-white uppercase tracking-wide px-6 py-3 border border-gray-400 rounded-full transition-all duration-300 hover:bg-[#D3FD50] hover:text-black hover:border-[#D3FD50] focus:bg-[#D3FD50] focus:text-black focus:border-[#D3FD50] focus:outline-none"
              >
                Become an Affiliate
              </Link>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <p className="text-xs text-gray-400 text-center">
              © 2025 Amoura Works
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header