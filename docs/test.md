# Project: Clothing Swap API documentation
Overrview of all API calls within the API.
# 📁 Collection: Health 


## End-point: Check Health
Queries the database and sees if it is running, implicitly checks if the server is also up.
### Method: GET
>```
>{{url}}/api/health
>```
### Response: 200
```json
"EVERYTHING IS A-OKAY"
```

### Response: 503
```json
"ERROR: ECONNREFUSED: Failed to connect"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Check Health Copy
Queries the database and sees if it is running, implicitly checks if the server is also up.
### Method: GET
>```
>{{url}}/api/health
>```
### Response: 200
```json
"EVERYTHING IS A-OKAY"
```

### Response: 503
```json
"ERROR: ECONNREFUSED: Failed to connect"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: User 


## End-point: Add User
Makes a new user give the Auth0 id. This is not to sign in / only for new users.
### Method: POST
>```
>{{url}}/api/user/:userId
>```
### Body (**raw**)

```json
{
    "lat": "41.303921",
    "lon": "-81.901693",
    "bio": "Sick drip and even sicker rhymes #meow"
}
```

### Response: 201
```json
"Made a user"
```

### Response: 400
```json
"User already in database"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get User
Makes a new user give the Auth0 id. This is not to sign in / only for new users.
### Method: GET
>```
>{{url}}/api/user/:userId
>```
### Body (**raw**)

```json

```

### Response: 200
```json
{
    "userId": "jacksons",
    "bio": "Sick drip and even sicker rhymes #meow",
    "matched": [
        "[]"
    ]
}
```

### Response: 404
```json
"No user found"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Clothing 


## End-point: Search for Clothes
Retrieves new options to swipe on based on the user's settings i.e. tags and location.
### Method: POST
>```
>{{url}}/api/clothes/search/:userId
>```
### Body (**raw**)

```json
{
    "colour": ["red", "blue"],
    "type": ["hat", "jumper"],
    "condition": ["new", "like-new"],
    "gender": ["male", "unisex"]
}

```

### Query Params

|Param|value|
|---|---|
|amount|Integer|


### Response: 200
```json
[
    {
        "clothingId": 1,
        "userId": "jacksons",
        "picture": null,
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "new",
        "style": null,
        "type": "hat",
        "user": {
            "userId": "jacksons",
            "lat": "",
            "lon": ""
        }
    },
    {
        "clothingId": 2,
        "userId": "jacksons",
        "picture": null,
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "new",
        "style": null,
        "type": "hat",
        "user": {
            "userId": "jacksons",
            "lat": "",
            "lon": ""
        }
    },
    {
        "clothingId": 3,
        "userId": "jacksons",
        "picture": null,
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "new",
        "style": null,
        "type": "hat",
        "user": {
            "userId": "jacksons",
            "lat": "",
            "lon": ""
        }
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get clothes by userid
Retrieves new options to swipe on based on the user's settings i.e. tags and location.
### Method: GET
>```
>{{url}}/api/clothes/:userID
>```
### Query Params

|Param|value|
|---|---|
|amount|Integer|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Post New Clothing Item
Adds a new clothing to the database with tags, sizes etc. given from the body.
### Method: POST
>```
>{{url}}/api/clothes/:userID
>```
### Body (**raw**)

```json
{
    "size": "XS",
    "colour": ["red"],
    "condition": "new",
    "gender": "unisex",
    "bio": "meow",
    "type": "hat"
}

```

### Response: 201
```json
{
    "itemId": 2
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edit Item
Edits a previous items tags, size, etc. Body params are all optional but there should be at least one, in the case where there is none, nothing will be edited.
### Method: PATCH
>```
>{{url}}/api/clothes/edit/:userId/:itemID
>```
### Body (**raw**)

```json
{
    "size": ["XXL"],
    "colour": ["red", "blue"],
    "brand": ["lakshansFavouriteClothingBrand", "clothing"],
    "type": "shirt",
    "condition": "new",
    "gender": "male"
}

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Item
### Method: DELETE
>```
>{{url}}/api/clothes/:clotheID
>```
### Body (**raw**)

```json
{
    "userID": "need to verify poster is id that is deleting the item."
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Messaging 


## End-point: Send a message
Sends a message to a user.
### Method: POST
>```
>{{url}}/api/messages/send/:userID
>```
### Body (**raw**)

```json
{
    "recipientID": "The persons ID you are messaging",
    "message": "The message text you are sending"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Messages
Get messages between two users.
### Method: GET
>```
>{{url}}/api/messages/:userID/:otherUserID
>```
### Query Params

|Param|value|
|---|---|
|amount|1|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Matching 


## End-point: Like/Dislike
### Method: GET
>```
>{{url}}/api/clothes/like/:userId/:clotheId?Like=true
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|Like|true|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Block
### Method: GET
>```
>{{url}}
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Unmatch
### Method: GET
>```
>{{url}}
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
