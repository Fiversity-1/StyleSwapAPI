# StyleSwapApi
<!-- actions --->
[![.github/workflows/main.yml](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml/badge.svg)](https://github.com/Fiversity-1/StyleSwapAPI/actions/workflows/main.yml)

### What is Style Swap?
<!-- copy from app --->

### Documentation
[Online Documentation via Postman](https://documenter.getpostman.com/view/37269020/2sA3kaBdp1)

Alternatively can access it via /docs/Clothing Swap API documentation.pdf

#### Adding tags to the database enums
To add a tag to a database enum see the file ```./api/src/enums.ts```, this will allow you to add tags to an existing enum, etc.

Obviously if you want to add a completely new enum for the clothing, this will need some code, but editing the ```./api/src/db/Clothing.ts``` and the ```./api/src/routes/clothing.ts``` to add the correct
code in there

#### Running
Warning This repository is not "batteries included". It does NOT include instructions to run a full Style Swap server, and we will not provide them. Please do not ask for help on this; you will be turned away. There are various security related environment variables in use that are obviously not supplied here and as such this will not work by just running the code.

# Clothing Swap API documentation (Might be bad quality as external tool was used to export it from postman, see original (here)[])

Overrview of all API calls within the API.

## Health

Health checks to ensure the server and database are running.

## GET Check Health

Queries the database and sees if it is running, implicitly checks if the server is also up.

## User

API calls related to user data, mainly adding and editing user information.

## POST Add User

Makes a new user give the Auth0 id. This is not to sign in / only for new users.

```
json
```

```
{{url}}/api/user/:userId
```
#### PATH VARIABLES

**userId** jacksons

```
{{url}}/api/clothes/search/:userId
```
#### PARAMS

**amount** Integer

#### PATH VARIABLES

**userId** jackson

##### {

```
"lat": "41.303921",
"lon": "-81.901693",
"bio": "Sick drip and even sicker rhymes #meow"
}
```
### GET Get User

Makes a new user give the Auth0 id. This is not to sign in / only for new users.

```
The UUID given by Auth provider.
```
## Clothing

Any API calls related to clothing. For example, adding a new post, editing a previous post or getting more choices to
swipe on.

### POST Search for Clothes

Retrieves new options to swipe on based on the user's settings i.e. tags and location.

```
The max amount to search for. Default 20.
```

#### Body raw (json)

```
{{url}}/api/clothes/:userID
```
#### PARAMS

**amount** Integer

#### PATH VARIABLES

**userID** UUID

```
{{url}}/api/clothes/:userID
```
#### PATH VARIABLES

**userID** jacksons

```
json
```
```
{
"colour": ["red","blue"],
"type": ["hat", "jumper"],
"condition": ["new", "like-new"],
"gender": ["male", "unisex"]
}
```
### GET get clothes by userid

Retrieves new options to swipe on based on the user's settings i.e. tags and location.

```
The max amount to search for. Default 20.
```
```
The user's id given by Auth0.
```
### POST Post New Clothing Item

Adds a new clothing to the database with tags, sizes etc. given from the body.


#### Body raw (json)

```
{{url}}/api/clothes/edit/:userId/:itemID
```
#### PATH VARIABLES

**userId** jackson

**itemID** 1

#### Body raw (json)

```
The user's id given by Auth0.
```
```
json
```
```
{
"size":"XS",
"colour": ["red"],
"condition":"new",
"gender": "unisex",
"bio": "meow",
"type":"hat"
}
```
### PATCH Edit Item

Edits a previous items tags, size, etc. Body params are all optional but there should be at least one, in the case where
there is none, nothing will be edited.

```
json
```
```
{
"size": ["XXL"],
"colour": ["red","blue"],
"brand": ["lakshansFavouriteClothingBrand", "clothing"],
"type":"shirt",
"condition":"new",
"gender": "male"
```

```
{{url}}/api/clothes/:clotheID
```
#### PATH VARIABLES

**clotheID**

#### Body raw (json)

```
{{url}}/api/messages/send/:userID
```
#### PATH VARIABLES

**userID**

#### Body raw (json)

##### }

### DELETE Delete Item

```
json
```
```
{
"userID": "need to verify poster is id that is deleting the item."
}
```
## Messaging

API calls around sending messages to other users.

### POST Send a message

Sends a message to a user.

```
The user's id given by Auth0.
```
```
json
```

```
{{url}}/api/messages/:userID/:otherUserID
```
#### PARAMS

**amount** 1

#### PATH VARIABLES

**userID**

**otherUserID**

```
{{url}}/api/clothes/like/:userId/:clotheId?Like=true
```
#### PARAMS

**Like** true

```
json
```
```
{
"recipientID": "The persons ID you are messaging",
"message": "The message text you are sending"
}
```
### GET Get Messages

Get messages between two users.

```
Gets max this amount of messages.
```
```
The user's id given by Auth0. This is the person you are getting messages
for.
```
```
The user's id given by Auth0. This is the person you are messaging.
```
## Matching

## Swiping

### GET Like/Dislike

```
Whether to like or dislike something, Default true.
```

#### PATH VARIABLES

**userId** rowan

**clotheId** 2

```
{{url}}
```
```
{{url}}
```
```
Whether to like or dislike something, Default true.
```
## Account

### GET Block

### GET Unmatch


message.txt
5 KB

### An ASCII Cat
```
  ,-.       _,---._ __  / \
 /  )    .-'       `./ /   \
(  (   ,'            `/    /|
 \  `-"             \'\   / |
  `.              ,  \ \ /  |
   /`.          ,'-`----Y   |
  (            ;        |   '
  |  ,-.    ,-'         |  /
  |  | (   |        hjw | /
  )  |  \  `.___________|/
  `--'   `--'
```
