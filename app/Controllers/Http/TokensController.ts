// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { generateUUID } from "App/helper/uuid";

export default class TokensController {
  public async create({response}){
    const token = generateUUID()
    response.cookie('token',token)
    response.status(200).send({data:"OK"})
  }
}
