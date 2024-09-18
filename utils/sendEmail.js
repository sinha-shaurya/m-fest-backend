const emailjs = require('@emailjs/browser');

const sendOTPEmail = async (recipientEmail, otp) => {
  try {
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const userID = process.env.EMAILJS_USER_ID;

    const templateParams = {
      to_email: recipientEmail,
      otp: otp,
    };

    const result = await emailjs.send(serviceID, templateID, templateParams, userID);

    console.log('Email successfully sent:', result.text);
    return true;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendOTPEmail;
