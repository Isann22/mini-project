import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Token {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.cookie('token')
    if(!token){
      return response.unauthorized({erros:{messages:"unauthorized"}})
    }
    request.cookie = token
    await next()
  }
}
