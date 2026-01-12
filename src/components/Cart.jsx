import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic Mojito',
      price: 12,
      quantity: 1,
      image: '/images/drink1.png'
    },
    {
      id: 2,
      name: 'Raspberry Mojito',
      price: 14,
      quantity: 2,
      image: '/images/drink2.png'
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-panel"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-modern-negra text-yellow">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-yellow transition-colors text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-8 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/60 text-lg">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="cart-item"
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-yellow font-bold">${item.price}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          <FaMinus size={12} />
                        </button>
                        <span className="text-white font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/20 pt-6 space-y-3">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-yellow">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full mt-6">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
