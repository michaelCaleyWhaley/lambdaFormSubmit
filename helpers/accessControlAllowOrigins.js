const allowedOrigins = [
  "http://localhost:3000",
  "https://d2zxlr302pg8t9.cloudfront.net",
];

function accessControlAllowOrigins(event, context) {
  const origin = event.headers.Origin || event.headers.origin;
  let goodOrigin = false;

  if (!origin) return;

  allowedOrigins.forEach((allowedOrigin) => {
    if (!goodOrigin && origin.match(allowedOrigin)) {
      goodOrigin = true;
    }
  });

  context.succeed({
    headers: {
      "Access-Control-Allow-Headers":
        "Accept,Accept-Language,Content-Language,Content-Type,Authorization,x-correlation-id",
      "Access-Control-Expose-Headers": "x-my-header-out",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "Access-Control-Allow-Origin": goodOrigin ? origin : allowedOrigins[0],
    },
    statusCode: 204,
  });
}

exports.accessControlAllowOrigins = accessControlAllowOrigins;
