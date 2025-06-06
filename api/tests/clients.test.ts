import { describe, expect, it, jest } from '@jest/globals'
import { handler } from '../src/handlers/createClient'
import { checkIfUserExists, createClient } from '../src/services/clientService'

jest.mock('../src/services/clientService', () => ({
  checkIfUserExists: jest.fn(),
  createClient: jest.fn()
}))

jest.mock('../src/services/dbClient', () => ({
  initializeConnection: jest.fn(() => Promise.resolve())
}))

describe('Create Client Handler Tests', () => {
  it('should create a client successfully', async () => {
    ;(checkIfUserExists as jest.Mock).mockImplementation(() => Promise.resolve())
    ;(createClient as jest.Mock).mockImplementation(() => Promise.resolve(1))

    const event:any = {
      body: JSON.stringify({
        name: 'John Doe',
        rfc: 'RFC123456',
        email: 'john.doe@example.com',
        cognitoSub: 'cognito-sub-123',
        phone: '1234567890',
        address: '123 Main St',
        password: 'SecurePassword123'
      })
    }

    const result = await handler(event)

    expect(result.statusCode).toBe(200)
    expect(JSON.parse(result.body)).toEqual({
      message: 'ClientCreatedSuccessfully',
      clientId: 1
    })
  })

  it('should return an error for invalid input', async () => {
    const event:any = {
      body: JSON.stringify({
        name: '',
        rfc: '',
        email: 'invalid-email',
        cognitoSub: '',
      })
    }

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body).error).toBe('Name is required');
  });

  it('should return an error for duplicate entries', async () => {
    ;(checkIfUserExists as jest.Mock).mockImplementation(() => Promise.resolve())
    ;(createClient as jest.Mock).mockRejectedValue(
      ({message: 'Duplicate key rfc', statusCode: 400, code: 'ER_DUP_ENTRY'} as never)
    )

    const event:any = {
      body: JSON.stringify({
        name: 'Jane Doe',
        rfc: 'RFC654321',
        email: 'jane.doe@example.com',
        cognitoSub: 'cognito-sub-123',
        password: 'superSecurePassword',
      })
    }

    const result = await handler(event)
    expect(result.statusCode).toBe(400)
    expect(JSON.parse(result.body).error).toBe('Duplicate key rfc')
  });
})
