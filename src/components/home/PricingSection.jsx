import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const PricingSection = () => {
  const sectionRef = useRef(null)
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    gsap.fromTo('.pricing-title',
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.pricing-title',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    gsap.fromTo('.pricing-content',
      {
        opacity: 0,
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: {
          amount: 0.4
        },
        scrollTrigger: {
          trigger: '.pricing-content',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  const highlights = [
    {
      icon: '✓',
      title: 'Multiple Revisions',
      description: 'We work until you\'re completely satisfied'
    },
    {
      icon: '⧗',
      title: 'On-Time Delivery Guarantee',
      description: 'Your project delivered exactly when promised'
    },
    {
      icon: '❖',
      title: 'Risk-Free First Edit',
      description: 'See our quality before you commit'
    }
  ]

  return (
    <section id="pricing" ref={sectionRef} className='min-h-screen section-dark text-white relative depth-3 section-transition'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto'>
          <h2 className='pricing-title font-[font2] heading-responsive-xl uppercase mb-6 sm:mb-8 lg:mb-10 leading-tight text-layer-3 text-glow'>
            Get a Quote
          </h2>
          
          {/* Pricing Hero Content */}
          <div className='pricing-content floating-panel-dark max-width-content mx-auto space-y-6 sm:space-y-8'>
            <div className='flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6'>
              <p className='font-[font1] text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-layer-2'>
                Our editing starts at just <span className='text-[#D3FD50] glow-accent text-glow-strong'>$ 149</span>
              </p>
              <p className='font-[font1] text-responsive leading-relaxed text-layer-1 max-width-text mx-auto'>
                Final pricing changes depending on the project type, complexity, and requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className='component-margin max-width-wide'>
          <div className='responsive-grid-3'>
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className='pricing-content group floating-panel-dark glass-hover glass-click gpu-accelerated text-center'
              >
                <div className='text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent'>
                  {highlight.icon}
                </div>
                
                <div className='space-y-4 sm:space-y-6'>
                  <h3 className='font-[font2] heading-responsive-md uppercase text-layer-2'>
                    {highlight.title}
                  </h3>
                  <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
                    {highlight.description}
                  </p>
                </div>

                <div className='w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent'></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center component-margin'>
          <div className='pricing-content floating-panel-dark max-width-content space-y-6 sm:space-y-8'>
            <button 
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
             className='btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group cursor-pointer'
            >
              <span className='font-[font2] text-base sm:text-xl lg:text-2xl'>
                Request a Quote
              </span>
            </button>
            
            <p className='font-[font1] text-sm sm:text-base text-layer-1'>
              Free consultation • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection