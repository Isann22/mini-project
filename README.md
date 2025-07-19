# API Doc

## GET token api

Endpoint : GET /api/token


Response Body Success : 

```json
{
  "data" : "OK"
}
```

Response Cookies :
  - Set-Cookie: token=[generated_token];

## Create Question API
Endpoint : GET /api/v1/questions

Request Body :

```json
{
 "question":"question"
}
```

Response Body Success : 

```json
{
  "data" : {
    "messages":"response question",
    "suggest_link":{
      "title":"response title",
      "link":"response link"
    }
  }
}
```

Response Body Error :

```json
{
  "errors" : {
    "messages": errors
  }
}
```

## Delete Questions API

Endpoint : DELETE /api/v1/questions/:id



Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : {
    "messages":"question not found"
  }
}
```

## Delete Conversation API

Endpoint : DELETE /api/v1/conversations/:id

Cookies :
-Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : {
    "messages":"conversation not found"
  }
}
```



## Get specific Conversation API

Endpoint : DELETE /api/v1/conversations/:id

Cookies :
-Authorization : token

Response Body Success :

```json
{
    "data": {
        "id": "id",
        "session_id": "session_id",
        "last_message": "last message"
    }
}
```

Response Body Error :

```json
{
  "errors" : {
    "messages":"conversation not found"
  }
}
```

## Search Conversation API

Endpoint : GET /api/v1/conversations

Cookies :
-Authorization : token

Query params :
- sender_type : Search by sender type (user/bot),optional
- last_message: Search last message , optional
- page : number of page
- limit : size per page

Response Body Success :

```json
  {
    "meta": {
        "total": 1,
        "per_page": 20,
        "current_page": null,
        "last_page": 1,
        "first_page": 1,
        "first_page_url": "/?page=1",
        "last_page_url": "/?page=1",
        "next_page_url": null,
        "previous_page_url": null
    },
    "data": [
        {
            "id": "id",
            "messages": [
                {
                    "sender_type": "USER",
                    "messages": "messages",
                    "conversation_id": "id"
                },
                {
                    "sender_type": "BOT",
                    "messages": "messages",
                    "conversation_id": "id"
                }
            ]
        }
    ]
  }
```


Response Body Error :
```json
{
  "errors" : {
    "messages": errors
  }
}
```


