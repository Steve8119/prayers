import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppService } from '../services/whatsappService';
import { WhatsAppConfig } from '../config/whatsappConfig';
import './Forms.css';

const PrayerForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    prayerType: 'personal',
    urgency: 'normal',
    prayerRequest: '',
    contact: false,
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the message for WhatsApp
    const message = WhatsAppService.formatPrayerMessage(formData);
    
    // Send to WhatsApp
    WhatsAppService.sendMessage(WhatsAppConfig.CHURCH_WHATSAPP_NUMBER, message);
    
    // Show success message
    setTimeout(() => {
      alert('🙏 Your prayer request has been sent! Our prayer team will intercede for you. You will be redirected to WhatsApp.');
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
    <motion.div className="form-wrapper prayer-form">
      <div className="form-header">
        <h2>🙏 Prayer Request</h2>
        <p>"The prayer of a righteous person is powerful and effective." - James 5:16</p>
        <div className="whatsapp-notice">
          📱 Your request will be sent to our prayer team via WhatsApp
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="prayer-form">
        <div className="form-group">
          <label>Your Name (Optional)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        {formData.contact && (
          <div className="form-group">
            <label>Your WhatsApp Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required={formData.contact}
              placeholder="Enter your WhatsApp number for follow-up"
            />
          </div>
        )}

        <div className="form-group">
          <label>Prayer Type</label>
          <select name="prayerType" value={formData.prayerType} onChange={handleChange}>
            <option value="personal">Personal Need</option>
            <option value="family">Family Matter</option>
            <option value="healing">Healing & Health</option>
            <option value="financial">Financial Breakthrough</option>
            <option value="guidance">Guidance & Wisdom</option>
            <option value="deliverance">Deliverance</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="urgency"
                value="low"
                checked={formData.urgency === 'low'}
                onChange={handleChange}
              />
              🟢 Low
            </label>
            <label>
              <input
                type="radio"
                name="urgency"
                value="normal"
                checked={formData.urgency === 'normal'}
                onChange={handleChange}
              />
              🟡 Normal
            </label>
            <label>
              <input
                type="radio"
                name="urgency"
                value="high"
                checked={formData.urgency === 'high'}
                onChange={handleChange}
              />
              🔴 High (Urgent)
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Prayer Request *</label>
          <textarea
            name="prayerRequest"
            value={formData.prayerRequest}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Please share your prayer request in detail. Our prayer team is standing with you in faith..."
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="contact"
              checked={formData.contact}
              onChange={handleChange}
            />
            I would like to be contacted by a prayer counselor on WhatsApp
          </label>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onClose} className="btn btn-cancel" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>⏳ Sending to WhatsApp...</>
            ) : (
              <>🙏 Submit Prayer Request</>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PrayerForm;