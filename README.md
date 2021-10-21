# lambdaFormSubmit
Serverless function which submits information to an email api. Written with the intention of being hosted on AWS lambda

## Deployment
Function is deployed on merge to master via github actions.

Documentation for AWS cli docs (used to deploy) can be found [Here](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html#cli-aws)

### Notes on lambda
Lambda functions require the async keyword in order to return a value. It's not too clear from AWS docs but it appears that the only way to return a value outside of using async keyword is to use the callback parameter. [Docs](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)