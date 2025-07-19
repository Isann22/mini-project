import { test } from '@japa/runner'

test.group('Conversation', () => {
    test('should reject no token', async ({ client }) => {
      const response = await client.get('/api/v1/conversations')
      response.assertStatus(401)
    })

     test('should can get all conversation', async ({ client }) => {
      const response = await client
        .get('/api/v1/conversations')
        .cookie('token','tes-123')
  
      response.assertStatus(200)
    })

     test('should can search with sender type', async ({ client }) => {
      const response = await client
        .get('/api/v1/conversations')
        .qs('sender_type','BOT')
        .cookie('token','tes-123')
  
      response.assertStatus(200)
    })
})
