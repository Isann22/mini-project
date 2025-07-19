// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Conversation from "App/Models/Conversation";

export default class ConversationsController {

  public async index({request,response}) {

    const {sender_type,last_message,page,limit} = request.qs()

    const data = await Conversation.query()
      .preload('messages',(q)=>{
        q.select('sender_type','messages')
        .if(sender_type,(q)=>q.where('sender_type', sender_type))
      }).select('id')
      .if(last_message, (q) => q.whereILike('last_message',  '%'+ last_message +'%' ))
      .paginate(page,limit)
      

    response.status(200).send(data)
  }

  public async destroy({request,response}){
    try {
      const id = request.param('id')
      const conversation = await Conversation.findOrFail(id)
      await conversation.delete()
      response.status(200).send({data:"OK"})
    } 
    catch (error) {
       response.notFound({erros:
       {messages:'conversation not found'}})
    }
  }

  public async show({request,response}){
     try {
      const id = request.param('id')
      const conversation = await Conversation.findOrFail(id)
      response.status(200).send({data:conversation})
    } 
    catch (error) {
       response.notFound({erros:
       {messages:'conversation not found'}})
    }
  }
}
