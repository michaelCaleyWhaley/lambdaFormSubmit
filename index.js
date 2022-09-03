const nodemailer = require("nodemailer");
const {
  accessControlAllowOrigins,
} = require("./helpers/accessControlAllowOrigins");
const { findHasBannedWords } = require("./helpers/findHasBannedWords");
const { emailDestOptions } = require("./constants");

// eslint-disable-next-line default-param-last
exports.handler = async (event = {}, context) => {
  if (event.headers) {
    // reminder: api gateway / middleware
    accessControlAllowOrigins(event, context);
    return null;
  }

  const { name, email, telephone, inquiry, emailDest } = event;
  if ((!name, !email, !telephone, !inquiry, !emailDestOptions[emailDest])) {
    return "Incomplete details";
  }

  const hasBannedWords = findHasBannedWords(inquiry);
  const { destination, signature } = emailDestOptions[emailDest];

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
    to: hasBannedWords ? "kneedeepwater@hotmail.com" : destination,
    cc: "caleymichael@outlook.com",
    subject: `${signature} webComments`,
    html: `${name} ${email} ${telephone} ${inquiry}`,
  };
  const response = await transporter.sendMail(mailOptions);
  return response;
};
