import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const WhyUsSection = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      '.quote-title',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.quote-title',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate intro text
    gsap.fromTo(
      '.intro-text',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.intro-text',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate benefit cards with stagger
    gsap.fromTo(
      '.quote-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: {
          amount: 0.4,
        },
        scrollTrigger: {
          trigger: '.quote-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  const highlights = [
    {
      icon: '✓',
      title: 'Multiple Revisions',
      description:
        'We work until you\'re completely satisfied with every detail of your wedding film.',
    },
    {
      icon: '⧗',
      title: 'On-Time Delivery Guarantee',
      description:
        'Your project delivered exactly when promised, every single time.',
    },
    {
      icon: '❖',
      title: 'Risk-Free First Edit',
      description:
        'See our quality before you commit. Experience our craftsmanship firsthand.',
    },
  ];

  return (
    <section
      id="quote"
      className="min-h-screen section-dark text-white relative depth-3 section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8 mx-auto">
          <h2 className="quote-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
            Get a Quote
          </h2>
          <div className="floating-panel-dark max-width-content mx-auto">
            <p className="intro-text font-[font1] text-responsive leading-relaxed text-layer-2">
              Our editing starts at just <span className='text-[#D3FD50] glow-accent text-glow-strong'>USD 149</span>
            </p>
          </div>
        </div>

        {/* Pricing Hero Content */}
        <div className='quote-card floating-panel-dark max-width-content mx-auto space-y-6 sm:space-y-8 component-margin'>
          <div className='flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6'>
            <p className='font-[font1] text-responsive leading-relaxed text-layer-1 max-width-text mx-auto'>
              Final pricing changes depending on the project type, complexity, and requirements.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="quote-grid responsive-grid-3 max-width-wide component-margin">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="quote-card group floating-panel-dark glass-hover glass-click gpu-accelerated text-center"
            >
              {/* Icon */}
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8 micro-bounce glow-accent">
                {highlight.icon}
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-[font2] heading-responsive-md uppercase text-layer-2">
                  {highlight.title}
                </h3>
                <p className="font-[font1] text-responsive leading-relaxed text-layer-1">
                  {highlight.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='text-center component-margin'>
          <div className='quote-card floating-panel-dark max-width-content space-y-6 sm:space-y-8'>
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
  );
};

export default WhyUsSection;