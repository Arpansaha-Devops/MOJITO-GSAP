import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const About = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [rating, setRating] = useState(0);

  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {
      type: 'words'
    });
    
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center'
      }
    });
    
    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0, duration: 1, yPercent: 100, ease: 'expo.out', stagger: 0.02
      })
      .from('.top-grid div, .bottom-grid div', {
        opacity: 0, scale: 0.9, duration: 1, ease: 'power1.inOut', stagger: 0.04,
      }, '-=0.5')
      .from('.badge', {
        opacity: 0, scale: 0, duration: 0.5, ease: 'back.out(1.7)'
      }, '-=1');

    // Animate counters
    gsap.to({}, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
        onEnter: () => {
          // Animate customer count
          gsap.to({ value: 0 }, {
            value: 12000,
            duration: 2,
            ease: 'power1.out',
            onUpdate: function() {
              setCustomerCount(Math.floor(this.targets()[0].value));
            }
          });
          
          // Animate rating
          gsap.to({ value: 0 }, {
            value: 4.5,
            duration: 2,
            ease: 'power1.out',
            onUpdate: function() {
              setRating(this.targets()[0].value.toFixed(1));
            }
          });
        }
      }
    });
  });
  
  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <motion.p
              className="badge"
              whileHover={{ scale: 1.1 }}
            >
              Best Cocktails
            </motion.p>
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>
          
          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
            </p>
            
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span className="text-gold-gradient">{rating}</span>/5
              </p>
              <p className="text-sm text-white-100">
                More than +{customerCount.toLocaleString()} customers
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="top-grid">
        <motion.div
          className="md:col-span-3"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </motion.div>
        
        <motion.div
          className="md:col-span-6"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </motion.div>
        
        <motion.div
          className="md:col-span-3"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-5" />
        </motion.div>
      </div>
      
      <div className="bottom-grid">
        <motion.div
          className="md:col-span-8"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-3" />
        </motion.div>
        
        <motion.div
          className="md:col-span-4"
          whileHover={{ scale: 1.05, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-4" />
        </motion.div>
      </div>
      
    </div>
  );
};

export default About;