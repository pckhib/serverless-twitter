# Serverless Twitter Clone

This application is a Twitter-like clone using AWS Lambda and Serverless framework.

It consists of the `backend` and an additional `client` implemented with React.

## Deploy backend

In order to deploy the backend run the following command inside the `backend` directory:

```
serverless deploy -v
```

## Run client

To run the React client run the following command inside the `client` directory. This will start a development server.

```
npm start

  // or

yarn start
```

## API

### Get Posts

Returns all posts that have been created so far.

```http
GET /posts
```

#### Response

```javascript
{
  "items": [
    {
      "createdAt": string,
      "text": string,
      "postId": string,
      "userId": string,
      "title": string,
      "imageUrl": string (optional)
    }
  ]
}
```

### Get Posts by User

Returns all posts that have been created by a specific user.

```http
GET /users/{userId}/posts
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `userId`  | `string` | **Required** The users ID |

#### Response

```javascript
{
    "items": [
    {
      "createdAt": string,
      "text": string,
      "postId": string,
      "userId": string,
      "title": string,
      "imageUrl": string (optional)
    }
  ]
}
```

### Create Post

Create a new post.

```http
POST /posts
```

#### Payload

```javascript
{
	"title": string,
	"text": string
}
```

#### Response

```javascript
{
  "item": {
    "userId": string,
    "postId": string,
    "createdAt": string,
    "title": string,
    "text": string
  }
}
```

### Update Post

Update an existing post.

```http
PATCH /posts/{postId}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `postId`  | `string` | **Required** The ID of the existing post |

#### Payload

```javascript
{
	"title": string,
	"text": string
}
```

#### Response

```javascript
"";
```

### Delete Post

Delete an existing post.

```http
DELETE /posts/{postId}
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `postId`  | `string` | **Required** The ID of the existing post |

#### Response

```javascript
"";
```

### Get Upload URL

Get an URL to upload an image to S3.

```http
POST /posts/{postId}/image
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `postId`  | `string` | **Required** The ID of the existing post |

#### Response

```javascript
{
  "uploadUrl": string
}
```