import nodemailer from "nodemailer";

const emailDestOptions = { default: "kneedeepwater@hotmail.com" };

exports.handler = async (event, context) => {
  const { name, email, telephone, inquiry, emailDest } = event;
  if ((!name, !email, !telephone, !inquiry, !emailDest)) {
    return "Incomplete details";
  }

  return "Complete details";

  // let transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   secure: true,
  //   port: 465,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_KEY,
  //   },
  // });

  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: emailDest,
  //   subject: "webComments",
  //   html: `${name} ${email} ${telephone} ${inquiry}`,
  // };

  // try {
  //   const response = await transporter.sendMail(mailOptions);
  //   res.send({ response });
  // } catch (e) {
  //   res.send({ e });
  // }
};
