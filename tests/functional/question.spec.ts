import { test } from '@japa/runner'

test.group('Question', () => {
  // Write your test here

    test('should reject if request is invalid', async ({ client }) => {
      const response = await client
        .post('/api/v1/questions')
        .cookie('token','tes-123')
        .json({
          "messages": ""
        })
      response.assertStatus(422)
    })

     test('should reject no token', async ({ client }) => {
      const response = await client
        .post('/api/v1/questions')
        .json({
          "messages": "test123"
        })
      response.assertStatus(401)
    })

    test('should can post question and receive response from external api', async ({ client }) => {
      const response = await client
        .post('/api/v1/questions')
        .cookie('token','tes-123')
        .json({
          "messages": "testt"
        })
      response.assertStatus(200)
    })

})
