const apiId = 'h7b3ayx5ta'
const auth0Domain = 'pckhib.eu.auth0.com'
const auth0ClientId = 'uFOO1Y8OfU3VH4xIjcwpreDIuskUN7dH'

export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/dev`

export const authConfig = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  callbackUrl: 'http://localhost:3000/callback',
}
