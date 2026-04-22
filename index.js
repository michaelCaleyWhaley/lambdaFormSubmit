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

  const { name, email, telephone, inquiry, trafficSource, emailDest } = event;
  if (
    (!name,
    !email,
    !telephone,
    !inquiry,
    !trafficSource,
    !emailDestOptions[emailDest])
  ) {
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
    subject: `${signature} webComments${
      hasBannedWords ? " hasBannedWords" : ""
    }`,
    html: `
  <table style="width: 100%; max-width: 600px;">
    <tr>
      <td style="padding: 8px 0; width: 120px;">Name</td>
      <td style="padding: 8px 0;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0;">Email</td>
      <td style="padding: 8px 0;">${email}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0;">Telephone</td>
      <td style="padding: 8px 0;"><a href="tel:${telephone}">${telephone}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; vertical-align: top;">Inquiry</td>
      <td style="padding: 8px 0; white-space: pre-wrap;">${inquiry}</td>
    </tr>
    ${
      trafficSource
        ? `
    <tr>
      <td style="padding: 8px 0; vertical-align: top;">Traffic source</td>
      <td style="padding: 8px 0;">
        <table>
          <tr>
            <td style="padding: 2px 12px 2px 0;">Channel</td>
            <td style="padding: 2px 0;">${trafficSource.channel}</td>
          </tr>
          <tr>
            <td style="padding: 2px 12px 2px 0;">Source</td>
            <td style="padding: 2px 0;">${trafficSource.source}</td>
          </tr>
          ${
            trafficSource.campaign
              ? `
          <tr>
            <td style="padding: 2px 12px 2px 0;">Campaign</td>
            <td style="padding: 2px 0;">${trafficSource.campaign}</td>
          </tr>
          `
              : ""
          }
        </table>
      </td>
    </tr>
    `
        : ""
    }
  </table>
`,
  };

  const response = await transporter.sendMail(mailOptions);
  return response;
};
