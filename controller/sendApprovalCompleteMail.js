const { sendEmail } = require("./sendMail");

module.exports = async function (req, res, next) {
  try {
    const subject = `Account Approved`;
    const emailBody = `<h1>Congratulations! Your account has now been Approved</h1></br><p>Here is your temporary password: ${req.body.password}</p>`;
    await sendEmail(req.body.email, subject, emailBody);

    res.status(200).json({ userCreation: 'Success', emailSent: 'Success' });
  } catch (error) {
    res.status(500).json({ userCreation: 'Success', emailSent: 'Failed' });
  }
};
