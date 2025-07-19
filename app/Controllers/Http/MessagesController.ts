import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator'
import { Sender_type } from 'App/Models/Enum';
import axios from 'axios';
import Conversation from 'App/Models/Conversation';


export default class MessagesController {
 
  public async store({request,response}: HttpContextContract) {
    const payload = await request.validate(MessageValidator);

    const conversation = new Conversation()
    conversation.last_message = payload.messages
    await conversation.save()

    const message = new Message()
    message.conversation_id = conversation.id
    message.messages = payload.messages
    message.sender_type = Sender_type.USER
    const data = await message.save();

    try {
      const question = {
        question:data.messages,
        session_id:conversation.session_id
      } 

      const bot = await axios.post("https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message",question)
      const {data: {message:[
        {text,suggest_links}
      ]}} = bot.data;

      const responseApi = new Message()
      responseApi.messages = text
      responseApi.conversation_id = conversation.id
      responseApi.sender_type = Sender_type.BOT
      await responseApi.save()

      response.status(200).send({data:{message:text},suggest_links})
    } catch (error) {
      response.status(error.response).send(error.response)
    }
  }
  

  public async destroy({request,response}: HttpContextContract) {
    try{
    const message_id = request.param('id')
    const message = await Message.findOrFail(message_id)
    await message.delete()
    response.ok({message:'OK'})
    }catch(error){
      response.notFound({data:'messages not found'})
    }
  }
  
}
