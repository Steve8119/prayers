import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppService } from '../services/whatsappService';
import { WhatsAppConfig } from '../config/whatsappConfig';
import './Forms.css';

const SalvationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    prayerTime: '',
    questions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const message = WhatsAppService.formatSalvationMessage(formData);
    
    // Send to WhatsApp
    WhatsAppService.sendMessage(WhatsAppConfig.CHURCH_WHATSAPP_NUMBER, message);
    
    // Show success message
    setTimeout(() => {
      alert('🎉 Hallelujah! Your salvation decision has been received. You will be redirected to WhatsApp to complete the process.');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div className="form-wrapper salvation-form">
      <div className="form-header">
        <h2>✝ Welcome to God's Family</h2>
        <p>We rejoice with you in your decision to follow Christ!</p>
        <div className="whatsapp-notice">
          📱 You will be redirected to WhatsApp to complete your submission
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="prayer-form">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your WhatsApp number"
          />
          <small className="input-hint">This will be used to contact you on WhatsApp</small>
        </div>

        <div className="form-group">
          <label>Preferred Prayer Time</label>
          <select name="prayerTime" value={formData.prayerTime} onChange={handleChange}>
            <option value="">Select a time</option>
            <option value="morning">Morning Prayer (6 AM)</option>
            <option value="noon">Noon Prayer (12 PM)</option>
            <option value="evening">Evening Prayer (6 PM)</option>
            <option value="asap">As Soon as Possible</option>
          </select>
        </div>

        <div className="form-group">
          <label>Any Questions or Prayer Needs?</label>
          <textarea
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            rows="4"
            placeholder="Share your thoughts, questions, or immediate prayer needs..."
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onClose} className="btn btn-cancel" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>⏳ Redirecting to WhatsApp...</>
            ) : (
              <>✝ Submit & Continue to WhatsApp</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SalvationForm;