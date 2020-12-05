// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'lk4upa5f43'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-y9y-2a0g.us.auth0.com',            // Auth0 domain
  clientId: 'fVQowIBQxGqCtSMlzjkBqFue1MvhCbmF',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
