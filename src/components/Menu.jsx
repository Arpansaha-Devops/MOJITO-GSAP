import React, { useState } from "react";
import { sliderLists } from '../../../Constants/index.js';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' });
    gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100, rotation: -20 }, {
      xPercent: 0, opacity: 1, rotation: 0, duration: 1, ease: 'power1.inOut'
    });
    gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 100, ease: 'power1.inOut'
    });
    gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 100, ease: 'power1.inOut', delay: 0.1
    });
  }, [currentIndex]);
  
  const totalCocktails = sliderLists.length;
  
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };
  
  const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
  };
  
  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);
  
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
      
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;
          
          return (
            <motion.button
              key={cocktail.id}
              className={`
                ${isActive
                  ? 'text-white border-white'
                  : 'text-white/50 border-white/50'}
              `}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cocktail.name}
            </motion.button>
          );
        })}
      </nav>
      
      <div className="content">
        <div className="arrows">
          <motion.button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="text-4xl mb-2" />
            <span>{prevCocktail.name}</span>
          </motion.button>
          
          <motion.button
            className="text-right"
            onClick={() => goToSlide(currentIndex + 1)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="text-4xl mb-2 ml-auto" />
            <span>{nextCocktail.name}</span>
          </motion.button>
        </div>
        
        <div className="cocktail">
          <motion.img
            key={currentIndex}
            src={currentCocktail.image}
            className="object-contain floating"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          />
        </div>
        
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
            <motion.button
              className="btn-primary mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now - $12
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;