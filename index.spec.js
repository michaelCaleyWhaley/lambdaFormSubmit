// eslint-disable-next-line node/no-unpublished-require
require("dotenv").config();
const nodemailer = require("nodemailer");
const { handler } = require("./index");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn((mailOptions) => {
      // console.log("mailOptions: ", mailOptions);
      const { to, cc } = mailOptions;
      return {
        accepted: [to, cc],
      };
    }),
  })),
}));

let handlerResult;

const details = {
  name: "michael",
  email: "kneedeepwater@hotmail.com",
  telephone: "0776770889",
  inquiry: "Test email form",
  emailDest: "caltech",
};

describe("email submissions", () => {
  describe("and the details are incomplete", () => {
    beforeEach(async () => {
      handlerResult = await handler();
    });

    it("should receive warning message", () => {
      expect(handlerResult).toBe("Incomplete details");
    });
  });

  describe("when details are complete", () => {
    beforeAll(async () => {
      handlerResult = await handler(details);
    });

    it("should respond with destination email", () => {
      expect(handlerResult.accepted).toStrictEqual([
        "info@caltechairconditioning.co.uk",
        "caleymichael@outlook.com",
      ]);
    });
  });

  describe("when inquiry contains banned keywords", () => {
    beforeAll(async () => {
      handlerResult = await handler({ ...details, inquiry: "search engine" });
    });

    it("should send email to developer email only", () => {
      expect(handlerResult).toStrictEqual({
        accepted: ["kneedeepwater@hotmail.com", "caleymichael@outlook.com"],
      });
    });
  });
});
