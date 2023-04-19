// eslint-disable-next-line node/no-unpublished-require
require("dotenv").config();

const { handler } = require("./index");

const mockSendMail = jest.fn((mailOptions) => {
  const { to, cc } = mailOptions;
  return {
    accepted: [to, cc],
  };
});

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: mockSendMail,
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

const bannedWordsDetails = {
  name: "michael",
  email: "kneedeepwater@hotmail.com",
  telephone: "0776770889",
  inquiry: "seo",
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
    beforeEach(async () => {
      handlerResult = await handler(details);
    });

    it("should respond with destination email", () => {
      expect(handlerResult.accepted).toStrictEqual([
        "info@caltechairconditioning.co.uk",
        "caleymichael@outlook.com",
      ]);
    });

    it("should call sendMail with mailOptions", () => {
      expect(mockSendMail).toHaveBeenCalledWith({
        cc: "caleymichael@outlook.com",
        from: "webcomments@caltechairconditioning.co.uk",
        html: "michael kneedeepwater@hotmail.com 0776770889 Test email form",
        subject: "Caltech webComments",
        to: "info@caltechairconditioning.co.uk",
      });
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

  describe("when query contains banned words", () => {
    beforeEach(async () => {
      handlerResult = await handler(bannedWordsDetails);
    });

    it("should append hasBannedWords to the subject and direct to kneedeep", () => {
      expect(mockSendMail).toHaveBeenCalledWith({
        cc: "caleymichael@outlook.com",
        from: "webcomments@caltechairconditioning.co.uk",
        html: "michael kneedeepwater@hotmail.com 0776770889 seo",
        subject: "Caltech webComments hasBannedWords",
        to: "kneedeepwater@hotmail.com",
      });
    });
  });
});
