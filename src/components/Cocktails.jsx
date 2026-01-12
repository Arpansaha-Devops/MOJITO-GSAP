import React, { useState } from 'react';
import { cocktailLists, mockTailLists } from '../../../Constants/index.js'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FaPlus, FaStar } from 'react-icons/fa';

const Cocktails = ({ onAddToCart }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  useGSAP(() => {
    const paralax = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      }
    });

    paralax.from("#c-left-leaf", {
      x: -100, y: 100, rotation: -20
    }).from("#c-right-leaf", {
      x: 100, y: 100, rotation: 20
    });

    // Animate cocktail items
    gsap.from('.cocktail-item', {
      scrollTrigger: {
        trigger: '#cocktails',
        start: 'top center',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  const handleAddToCart = (drink) => {
    if (onAddToCart) {
      onAddToCart(drink);
    }
  };

  const DrinkItem = ({ drink, index }) => (
    <motion.li
      className="cocktail-item group"
      onHoverStart={() => setHoveredItem(index)}
      onHoverEnd={() => setHoveredItem(null)}
      whileHover={{ x: 10 }}
    >
      <div className="md:me-28">
        <div className="flex items-center gap-2 mb-1">
          <h3>{drink.name}</h3>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow text-xs" />
            ))}
          </div>
        </div>
        <p>{drink.country} | {drink.detail}</p>
      </div>
      <div className="flex items-center gap-4">
        <span>{drink.price}</span>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleAddToCart(drink)}
          className="w-8 h-8 rounded-full bg-yellow text-black flex-center hover:shadow-lg hover:shadow-yellow/50 transition-shadow"
          aria-label={`Add ${drink.name} to cart`}
        >
          <FaPlus size={14} />
        </motion.button>
      </div>
    </motion.li>
  );

  return (
    <section id='cocktails' className='noisy'>
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id='c-left-leaf' />
      <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id='c-right-leaf' />

      <div className='list'>
        <div className='popular'>
          <h2>Most Popular cocktails :</h2>
          <ul>
            {cocktailLists.map((drink, index) => (
              <DrinkItem key={drink.name} drink={drink} index={`popular-${index}`} />
            ))}
          </ul>
        </div>

        <div className='loved'>
          <h2>Most Loved Mocktails :</h2>
          <ul>
            {mockTailLists.map((mock, index) => (
              <DrinkItem key={mock.name} drink={mock} index={`loved-${index}`} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;