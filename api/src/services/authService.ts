import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { errorResponse } from '../utils/response'

const cognito = new CognitoIdentityServiceProvider()

export async function signUpUserInCognito(email: string, password: string, name: string): Promise<string> {
  const signUpParams = {
    ClientId: process.env.COGNITO_CLIENT_ID!,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: name }
    ]
  }

  try {
    const response = await cognito.signUp(signUpParams).promise()
    return response.UserSub
  } catch (err: any) {
    if (err.code === 'UsernameExistsException') {
      throw new Error('UsernameExistsError')
    } else if (err.code === 'InvalidPasswordException') {
      throw new Error('InvalidPasswordError')
    } else {
      console.error('Error signing up user in Cognito:', err)
      throw new Error('CognitoSignUpError')
    }
  }
}

export async function loginClient(params: { email: string; password: string }) {
  try {
    const response = await cognito
      .initiateAuth({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID!,
        AuthParameters: {
          USERNAME: params.email,
          PASSWORD: params.password
        }
      })
      .promise()

    return { token: response.AuthenticationResult?.IdToken }
  } catch (err: any) {
    if (err.code === 'UserNotConfirmedException') {
      return { message: 'UserNotConfirmed' }
    }
    return { message: 'InvalidCredentials' }
  }
}

export async function verifyCode(params: { email: string; code: string }) {
  try {
    await cognito
      .confirmSignUp({
        ClientId: process.env.COGNITO_CLIENT_ID!,
        Username: params.email,
        ConfirmationCode: params.code
      })
      .promise()

    return { message: 'VerificationSuccessful' }
  } catch (err: any) {
    throw new Error('InvalidVerificationCode')
  }
}