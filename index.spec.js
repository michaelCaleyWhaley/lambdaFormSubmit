require("dotenv").config();
const { handler, emailDestOptions } = require("./index");

let handlerResult;

const details = {
  name: "michael",
  email: "kneedeepwater@hotmail.com",
  telephone: "0776770889",
  inquiry: "hello",
  emailDest: "default",
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
        emailDestOptions[details.emailDest],
      ]);
    });
  });
});
