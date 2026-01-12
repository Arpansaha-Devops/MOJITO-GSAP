import React, { useState } from 'react';
import { navLinks } from '../../Constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onCartClick, cartItemCount = 2 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top"
      }
    });
    navTween.fromTo("nav", 
      { backgroundColor: "transparent" }, 
      { 
        backgroundColor: "#00000090", 
        backdropFilter: "blur(20px)",
        duration: 0.5, 
        ease: "power1.inOut" 
      }
    );

    // Animate nav items on load
    gsap.from("nav a", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);

  return (
    <nav className="glass-dark">
      <div>
        <a href="#home" className='flex items-center gap-2'>
          <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
          <p>velvet pour</p>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="relative group">
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Cart Icon */}
        <button
          onClick={onCartClick}
          className="relative text-white hover:text-yellow transition-colors"
          aria-label="Shopping Cart"
        >
          <FaShoppingCart size={24} />
          {cartItemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-yellow text-black text-xs font-bold rounded-full w-5 h-5 flex-center"
            >
              {cartItemCount}
            </motion.span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white hover:text-yellow transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-dark"
          >
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg"
                  >
                    {link.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;