import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { Sender_type } from './Enum'
import { generateUUID } from 'App/helper/uuid'
import Conversation from './Conversation'


export default class Message extends BaseModel {
  @column({ isPrimary: true})
  public id: string


  @column()
  public sender_type:Sender_type

  @column()
  public messages:string

  @column()
  public conversation_id:string

  @column.dateTime({ autoCreate: true,serializeAs:null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true,serializeAs:null })
  public updatedAt: DateTime

  @belongsTo(()=>Conversation)
  public conversation : BelongsTo<typeof Conversation>

  @beforeCreate()
  public static createId(message:Message):string{
    return message.id = generateUUID()
  }


}
