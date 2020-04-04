import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import Axios from 'axios' 
import { JwtPayload } from '../../auth/JwtPayload'
import { verify } from 'jsonwebtoken'
import { certToPEM } from '../../utils'

import 'source-map-support/register'

// TODO - add Auth0 url
const jwksUrl = ''

export const handler = async(event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  console.log('Authorizing a user', event.authorizationToken)

  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User was not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)

  const jwksRequest = await Axios.get(jwksUrl)

  const signingKeys = jwksRequest.data.signingKeys
    .filter(key => key.use === 'sig'  // JWK property `use` determines the JWK is for signing
      && key.kty === 'RSA'            // We are only supporting RSA (RS256)
      && key.kid                      // The `kid` must be present to be useful for later
      && ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
    ).map(key => {
      return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
    })

  return verify(token, signingKeys[0].publicKey, { algorithms: ['RS256'] }) as JwtPayload
}

function getToken(authHeader: string): string {
  if (!authHeader) {
    throw new Error('No authentication header')
  }

  if (!authHeader.toLocaleLowerCase().startsWith('bearer')) {
    throw new Error('Invalid authentication header')
  }

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
