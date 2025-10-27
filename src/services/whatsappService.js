export class WhatsAppService {
  static sendMessage(phoneNumber, message) {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
  }

  static formatSalvationMessage(formData) {
    return `🕊 *NEW SALVATION DECISION* 🕊

*Name:* ${formData.name}
*Contact:* ${formData.phone} ${formData.email ? `| ${formData.email}` : ''}
*Preferred Prayer Time:* ${formData.prayerTime || 'Not specified'}

*Decision Details:*
${formData.questions || 'No additional details provided'}

_Praise God for this new soul!_
📍 Ridgeways Pentecostal Church`;
  }

  static formatPrayerMessage(formData) {
    const urgencyEmoji = {
      'low': '🟢',
      'normal': '🟡', 
      'high': '🔴'
    };

    return `🙏 *NEW PRAYER REQUEST* 🙏

*Name:* ${formData.name || 'Anonymous'}
*Prayer Type:* ${formData.prayerType}
*Urgency:* ${urgencyEmoji[formData.urgency] || '🟡'} ${formData.urgency}

*Prayer Request:*
${formData.prayerRequest}

${formData.contact ? '✅ _Requested follow-up contact_' : ''}

_Let us pray together in faith_
📍 Ridgeways Pentecostal Church`;
  }

  static formatTestimonyMessage(formData) {
    return `⭐ *NEW TESTIMONY SHARED* ⭐

*Name:* ${formData.name}
*Testimony Type:* ${formData.testimonyType}
*Title:* ${formData.title}

*Powerful Testimony:*
${formData.testimony}

${formData.sharePublicly ? '✅ _Approved for public sharing_' : '❌ _Private testimony_'}

_To God be the glory!_
📍 Ridgeways Pentecostal Church`;
  }
}