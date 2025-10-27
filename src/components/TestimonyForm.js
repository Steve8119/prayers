import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppService } from '../services/whatsappService';
import { WhatsAppConfig } from '../config/whatsappConfig';
import './Forms.css';

const TestimonyForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    testimonyType: 'healing',
    title: '',
    testimony: '',
    sharePublicly: true,
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const message = WhatsAppService.formatTestimonyMessage(formData);
    
    // Send to WhatsApp
    WhatsAppService.sendMessage(WhatsAppConfig.CHURCH_WHATSAPP_NUMBER, message);
    
    // Show success message
    setTimeout(() => {
      alert('⭐ Hallelujah! Thank you for sharing your testimony. You will be redirected to WhatsApp to complete your submission.');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <motion.div className="form-wrapper testimony-form">
      <div className="form-header">
        <h2>⭐ Share Your Testimony</h2>
        <p>"They triumphed by the blood of the Lamb and by the word of their testimony." - Revelation 12:11</p>
        <div className="whatsapp-notice">
          📱 Your testimony will be shared with our church leaders via WhatsApp
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="prayer-form">
        <div className="form-group">
          <label>Your Name *</label>
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
          <label>Your WhatsApp Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your WhatsApp number"
          />
          <small className="input-hint">We may contact you to learn more about your testimony</small>
        </div>

        <div className="form-group">
          <label>Testimony Type</label>
          <select name="testimonyType" value={formData.testimonyType} onChange={handleChange}>
            <option value="healing">Healing & Miracle</option>
            <option value="salvation">Salvation Story</option>
            <option value="provision">Financial Provision</option>
            <option value="deliverance">Deliverance</option>
            <option value="relationship">Relationship Restoration</option>
            <option value="breakthrough">Business/Career Breakthrough</option>
            <option value="other">Other Blessing</option>
          </select>
        </div>

        <div className="form-group">
          <label>Testimony Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Give your testimony a powerful title"
          />
        </div>

        <div className="form-group">
          <label>Your Testimony *</label>
          <textarea
            name="testimony"
            value={formData.testimony}
            onChange={handleChange}
            rows="8"
            required
            placeholder="Share your powerful testimony in detail. How did God move in your life? What was the situation before and after? Your story will inspire others!"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="sharePublicly"
              checked={formData.sharePublicly}
              onChange={handleChange}
            />
            I give permission to share this testimony publicly to encourage others (in church, on social media, etc.)
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onClose} className="btn btn-cancel" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>⏳ Sharing via WhatsApp...</>
            ) : (
              <>⭐ Share Testimony</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TestimonyForm;