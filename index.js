const nodemailer = require("nodemailer");
const {
  accessControlAllowOrigins,
} = require("./helpers/accessControlAllowOrigins");

const emailDestOptions = { default: "kneedeepwater@hotmail.com" };

exports.handler = async (event = {}, context) => {
  if (event.headers) {
    accessControlAllowOrigins(event, context);
    return;
  }

  const { name, email, telephone, inquiry, emailDest } = event;
  if ((!name, !email, !telephone, !inquiry, !emailDestOptions[emailDest])) {
    return "Incomplete details";
  }
  const validEmailRecipient = emailDestOptions[emailDest];
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
    to: validEmailRecipient,
    subject: "lambda webComments",
    html: `${name} ${email} ${telephone} ${inquiry}`,
  };
  const response = await transporter.sendMail(mailOptions);
  return response;
};

exports.emailDestOptions = emailDestOptions;
