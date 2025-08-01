/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContext } from '@adonisjs/core/build/standalone'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

   public async handle(error: any, ctx:HttpContext) {
    /**
     * Self handle the validation exception
     */
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).json(error.messages)
    }

    /**
     * Forward rest of the exceptions to the parent class
     */

    // Route 404
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).json({
        message: 'Route not found!',
        error,
      })
    }

    if(error.code ==='E_Internal_Server_Error'){
      return ctx.response.status(500).json({
            message: 'server error',
            error: {
              message: error.message,
              stack: error.stack,
            },
          })
    }
  
    return super.handle(error, ctx)
  }
}

