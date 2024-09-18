const emailjs = require('@emailjs/browser');

const sendEmail = (to, subject, text) => {
  const templateParams = {
    to_email: to,
    subject,
    message: text,
  };

  emailjs.send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, templateParams, process.env.EMAIL_USER_ID)
    .then((response) => {
      console.log('Email sent successfully:', response.status);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
    });
};

module.exports = { sendEmail };
