# StyleSwapApi
<!-- actions --->
[![.github/workflows/main.yml](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml/badge.svg)](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml)

### What is Style Swap?
StyleSwap is a prototype android application which provides a convenient and seemless interface for users to swap their clothes.

The API is created using NodeJS since it is an industry standard for API servers. The database is PostgresSQL.

### Documentation
[Online Documentation via Postman](https://documenter.getpostman.com/view/37269020/2sA3kaBdp1)

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
    "lat": "The lat coord of the user",
    "lon": "The lon coord of the user",
    "bio": "The bio for the user profile",
    "name": "The users name"
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
    "name": "jackson",
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
    "distance": "The radius to search in"
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
        "clothingId": 25,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "ff",
        "colour": [
            "purple",
            "red"
        ],
        "size": "L",
        "gender": "male",
        "condition": "worn",
        "style": null,
        "type": "coat",
        "images": [
           "thisisanexampleofanimage" 
        ],
        "user": {
            "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
            "name": "Rowan Gray (RowBro)",
            "lat": "",
            "lon": ""
        },
        "distance": 13.515687342707686
    },
    {
        "clothingId": 24,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "rjjcuf",
        "colour": [
            "green",
            "purple",
            "orange"
        ],
        "size": "XS",
        "gender": "female",
        "condition": "newWithTags",
        "style": null,
        "type": "coat",
        "images": [
           "thisisanexampleofanimage" 
        ],
        "user": {
            "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
            "name": "Rowan Gray (RowBro)",
            "lat": "",
            "lon": ""
        },
        "distance": 13.515687342707686
    },
    {
        "clothingId": 23,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "Farmer shirt lol",
        "colour": [
            "lightBlue",
            "darkBlue",
            "orange"
        ],
        "size": "M",
        "gender": "male",
        "condition": "newNoTags",
        "style": null,
        "type": "jumper",
        "images": [
           "thisisanexampleofanimage"  
        ],
        "user": {
            "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
            "name": "Rowan Gray (RowBro)",
            "lat": "",
            "lon": ""
        },
        "distance": 13.515687342707686
    },
    {
        "clothingId": 22,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "work shorts",
        "colour": [
            "black"
        ],
        "size": "L",
        "gender": "male",
        "condition": "likeNew",
        "style": null,
        "type": "pants",
        "images": [
           "thisisanexampleofanimage"  
        ],
        "user": {
            "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
            "name": "Rowan Gray (RowBro)",
            "lat": "",
            "lon": ""
        },
        "distance": 13.515687342707686
    },
    {
        "clothingId": 10,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "test image",
        "colour": [
            "yellow"
        ],
        "size": "L",
        "gender": "female",
        "condition": "newNoTags",
        "style": null,
        "type": "pants",
        "images": [
           "thisisanexampleofanimage" 
        ],
        "user": {
            "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
            "name": "Rowan Gray (RowBro)",
            "lat": "",
            "lon": ""
        },
        "distance": 13.515687342707686
    }
]
```

### Response: 404
```json
"User not found"
```

### Response: 200
```json
[
    {
        "clothingId": 35,
        "userId": "CvERSFKX9hNfsnM9udUsv7iBKRD3",
        "bio": "Nice",
        "colour": [
            "green"
        ],
        "size": "XS",
        "gender": "male",
        "condition": "newNoTags",
        "style": null,
        "type": "shirt",
        "images": [
           "thisisanexampleofanimage" 
        ],
        "user": {
            "userId": "CvERSFKX9hNfsnM9udUsv7iBKRD3",
            "name": "Jacob Poole",
            "lat": "",
            "lon": ""
        },
        "distance": 1372.014604003839
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


### Response: 200
```json
[
    {
        "clothingId": 2,
        "userId": "jackson",
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "newNoTags",
        "style": null,
        "type": "hat",
        "images": [
            "MTI0NDIxNA==",
            "MTI0MTI0"
        ]
    },
    {
        "clothingId": 3,
        "userId": "jackson",
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "newNoTags",
        "style": null,
        "type": "hat",
        "images": [
            "MTI0NDIxNA==",
            "MTI0MTI0"
        ]
    },
    {
        "clothingId": 4,
        "userId": "jackson",
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "newNoTags",
        "style": null,
        "type": "hat",
        "images": [
            "MTI0NDIxNA==",
            "MTI0MTI0"
        ]
    },
    {
        "clothingId": 5,
        "userId": "jackson",
        "bio": "meow",
        "colour": [
            "red"
        ],
        "size": "XS",
        "gender": "unisex",
        "condition": "newNoTags",
        "style": null,
        "type": "hat",
        "images": [
            "MTI0NDIxNA==",
            "MTI0MTI0"
        ]
    },
    {
        "clothingId": 7,
        "userId": "jackson",
        "bio": "test",
        "colour": [
            "purple"
        ],
        "size": "XXS",
        "gender": "female",
        "condition": "newNoTags",
        "style": null,
        "type": "pants",
        "images": []
    },
    {
        "clothingId": 8,
        "userId": "jackson",
        "bio": "test",
        "colour": [
            "purple"
        ],
        "size": "XXS",
        "gender": "female",
        "condition": "newNoTags",
        "style": null,
        "type": "pants",
        "images": []
    },
    {
        "clothingId": 12,
        "userId": "jackson",
        "bio": "test",
        "colour": [
            "purple"
        ],
        "size": "XXS",
        "gender": "female",
        "condition": "newNoTags",
        "style": null,
        "type": "pants",
        "images": []
    }
]
```

### Response: 404
```json
"User not found"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Post New Clothing Item
Adds a new clothing to the database with tags, sizes etc. given from the body.
### Method: POST
>```
>{{url}}/api/clothes/:userID
>```
### Body (**raw**)

```json
{"colour":["purple"],"size":"XXS","condition":"newNoTags","gender":"female","type":"pants","bio":"test","images":[]}

```

### Response: 201
```json
{
    "itemId": 26
}
```

### Response: 404
```json
"User not found"
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
    "type": "shirt",
    "condition": "newWithTags",
    "gender": "male"
}

```

### Response: 200
```json
"Item updated"
```

### Response: 403
```json
"Unauthorised to edit this item"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Item
### Method: DELETE
>```
>{{url}}/api/clothes/:userId/:clothingId
>```
### Body (**raw**)

```json

```

### Response: 203
```json
"Item deleted"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add item to trade
### Method: GET
>```
>{{url}}/clothes/:userId/match/:clotheId
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Remove item to trade
### Method: GET
>```
>{{url}}/clothes/:userId/unmatch/:clotheId
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get matches between
### Method: GET
>```
>{{url}}/api/match/:userId1/:userId2
>```

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


### Response: 200
```json
[
    {
        "clothingId": 25,
        "userId": "fqxKpnY1ssbMplM62p1e4LsTOF22",
        "bio": "ff",
        "colour": [
            "purple",
            "red"
        ],
        "size": "L",
        "gender": "male",
        "condition": "worn",
        "style": null,
        "type": "coat",
        "images": [
           "thisisanexampleofanimage" 
        ]
    }
]
```

### Response: 200
```json
"Liked but no matches"
```

### Response: 404
```json
"No Clothing item found"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Block
### Method: GET
>```
>{{url}}/api/user/block/:userId1/:userId2
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Unmatch
### Method: GET
>```
>{{url}}/api/user/unmatch/:userId1/:userId2
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get user matches
### Method: GET
>```
>{{url}}/api/match/:userId
>```
### Response: 200
```json
[
    {
        "userId": "jacksonsss",
        "name": "The users name"
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
