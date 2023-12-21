const { mailClient, smtpSenderEmail } = require("./config");

async function sendEmail(to, subject, html) {
  // Email content
  const mailOptions = {
    from: smtpSenderEmail,
    to: to,
    subject: subject,
    html: html,
  };

  try {
    // Sending the email
    await mailClient.sendMail(mailOptions);
    
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error occurred while sending email:", error);
    // Propagate the error to the calling function
    throw new Error("Failed to send email");
  }
}

module.exports = {
  sendEmail: sendEmail,
};
