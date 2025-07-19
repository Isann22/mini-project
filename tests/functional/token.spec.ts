import { test } from '@japa/runner'

test.group('Token', () => {
  // Write your test here
  test('should can get token and set cookie',async ({client})=>{
    const response = await client.get('/api/v1/token')
    response.assertStatus(200)
    response.assertCookie('token')
  })
})
