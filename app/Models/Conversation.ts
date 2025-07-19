import { DateTime } from 'luxon'
import { BaseModel, column,beforeCreate, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { generateUUID } from 'App/helper/uuid'
import Message from './Message'


export default class Conversation extends BaseModel {
  @column({ isPrimary: true})
  public id: string

  @column()
  public session_id:string

  @column()
  public last_message:string

  @column.dateTime({ autoCreate: true,serializeAs:null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true,serializeAs:null })
  public updatedAt: DateTime

  @hasMany(()=>Message,{
    foreignKey:'conversation_id'
  })
  public messages : HasMany<typeof Message>

  @beforeCreate()
    public static createId(conversation:Conversation):string{
      return conversation.id = generateUUID()
    }

  @beforeCreate()
    public static createSessionId(conversation:Conversation):string{
      return conversation.session_id = generateUUID()
    }
}
