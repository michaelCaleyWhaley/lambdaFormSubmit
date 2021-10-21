const nodemailer = require("nodemailer");

const emailDestOptions = { default: "kneedeepwater@hotmail.com" };

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  const { name, email, telephone, inquiry, emailDest } = event;
  if ((!name, !email, !telephone, !inquiry, !emailDestOptions[emailDest])) {
    return "Incomplete details";
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_KEY,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailDest,
    subject: "webComments",
    html: `${name} ${email} ${telephone} ${inquiry}`,
  };

  const response = await transporter.sendMail(mailOptions);
  return response;
};
