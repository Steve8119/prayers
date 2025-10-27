import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SalvationForm from './SalvationForm';
import PrayerForm from './PrayerForm';
import TestimonyForm from './TestimonyForm';
import './PrayerForms.css';

const PrayerForms = ({ activeForm, onClose }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const formVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", damping: 25 }
    },
    exit: { scale: 0.8, opacity: 0 }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'salvation':
        return <SalvationForm onClose={onClose} />;
      case 'prayer':
        return <PrayerForm onClose={onClose} />;
      case 'testimony':
        return <TestimonyForm onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeForm && (
        <motion.div
          className="form-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="form-container"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {renderForm()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrayerForms;