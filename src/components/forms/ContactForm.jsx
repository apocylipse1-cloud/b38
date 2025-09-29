import React from 'react'
import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    venue: '',
    package: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/mandlzyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          venue: '',
          package: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='floating-panel-dark'>
      <h2 className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-layer-2 text-glow'>
        Inquire Now
      </h2>
      
      {submitStatus === 'success' && (
        <div className='success-state mb-6 sm:mb-8'>
          <p className='font-[font2] text-base sm:text-lg'>
            Thank you for your inquiry! We will get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className='error-state mb-6 sm:mb-8'>
          <p className='font-[font2] text-base sm:text-lg'>
            Sorry, there was an error sending your message. Please try again or contact us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6 sm:space-y-8'>
        <div className='form-grid form-grid-2 gap-4 sm:gap-6'>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className='w-full input-inset text-white placeholder:text-gray-400'
          />
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className='w-full input-inset text-white placeholder:text-gray-400'
          />
        </div>
        
        <input 
          type="email" 
          name="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
        />
        
        <input 
          type="tel" 
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
        />
        
        <input 
          type="text" 
          name="venue"
          placeholder="Wedding Venue"
          value={formData.venue}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400'
        />
        
        <select 
          name="package"
          value={formData.package}
          onChange={handleChange}
          disabled={isSubmitting}
          className='w-full input-inset text-white'
        >
          <option value="">Select Package</option>
          <option value="essential">Essential Package</option>
          <option value="premium">Premium Package</option>
          <option value="luxury">Luxury Package</option>
          <option value="custom">Custom Package</option>
        </select>
        
        <textarea 
          name="message"
          placeholder="Tell us about your wedding vision, special requests, or any questions you have..."
          value={formData.message}
          onChange={handleChange}
          rows="4"
          disabled={isSubmitting}
          className='w-full input-inset text-white placeholder:text-gray-400 resize-none'
        />
        
        <button 
          type="submit"
          disabled={isSubmitting}
         className='w-full btn-pill btn-primary h-12 sm:h-14 lg:h-16 font-[font2] text-base sm:text-xl lg:text-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm