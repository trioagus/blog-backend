# Article API Spec

## Create Article

## Endpoint

- **Method:** POST
- **URL:** `/article`
- **NOTE:** use admin email account admin1@gmail.com, admin2@gmail.com

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Request Body (Form Data)

- **Title:** [Title of the article]
- **Content:** [Content of the article]
- **Image:** [Image file]
- **Author ID:** [ID of the author]
- **Category ID:** [ID of the category]

### Example

#### Request

POST /article HTTP/1.1
Host: http://localhost:3003
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNzEyNmZlLWExNzgtNDI5Ni05Mjc1LTgyYmU1NWFkODFhMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTMxNDc5MjcsImV4cCI6MTcxMzc1MjcyN30.YUL24hFUzOTfVK1KJOwlF_XN9VA6Dgx-2dsbOE4mzR0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

Title of the Article
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="content"

Content of the article goes here.
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="article_image.jpg"
Content-Type: image/jpeg

[Binary data of the image file]
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="author_id"

1234567890
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="category_id"

9876543210
----WebKitFormBoundary7MA4YWxkTrZu0gW--

## Update Article

### Endpoint

- **Method:** PUT
- **URL:** `/article/:id`
- **NOTE:** Use the ID of the article you want to update in place of `:id`.

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Request Body (Form Data)

- **ID:** [Id article]
- **Title:** [Updated title of the article]
- **Content:** [Updated content of the article]
- **Image:** [Updated image file, if applicable]
- **Author ID:** [ID of the author]
- **Category ID:** [ID of the category]

### Example

#### Request

PUT /article/123456 HTTP/1.1
Host: http://localhost:3003
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNzEyNmZlLWExNzgtNDI5Ni05Mjc1LTgyYmU1NWFkODFhMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTMxNDc5MjcsImV4cCI6MTcxMzc1MjcyN30.YUL24hFUzOTfVK1KJOwlF_XN9VA6Dgx-2dsbOE4mzR0
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

Updated Title of the Article
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="content"

Updated Content of the article goes here.
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="updated_article_image.jpg"
Content-Type: image/jpeg

[Binary data of the updated image file]
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="author_id"

1234567890
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="category_id"

9876543210
----WebKitFormBoundary7MA4YWxkTrZu0gW--

### Response

```json
{
    "message": "Article updated successfully"
}
```

## Delete Article

### Endpoint

- **Method:** DELETE
- **URL:** `/article/:id`
- **NOTE:** Use the ID of the article you want to delete in place of `:id`.

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Example

#### Request

```http
DELETE /article/123456 HTTP/1.1
Host: http://localhost:3003
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczNzEyNmZlLWExNzgtNDI5Ni05Mjc1LTgyYmU1NWFkODFhMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTMxNDc5MjcsImV4cCI6MTcxMzc1MjcyN30.YUL24hFUzOTfVK1KJOwlF_XN9VA6Dgx-2dsbOE4mzR0
```

### Response

```json
{
    "message": "Article deleted successfully"
}
```

## Get Article

### Endpoint

- **Method:** GET
- **URL:** `/article`

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Response

```json
[
    {
        "id": "123456",
        "title": "Article Title",
        "content": "Article content goes here.",
        "author_id": "789012",
        "category_id": "345678",
        "imageURL": "http://example.com/article_image.jpg"
    },
    {
        "id": "789012",
        "title": "Another Article",
        "content": "Another article content.",
        "author_id": "123456",
        "category_id": "345678",
        "imageURL": "http://example.com/another_image.jpg"
    }
]
```

## Get Article By ID

### Endpoint

- **Method:** GET
- **URL:** `/article/:id`
- **NOTE:** Use the ID of the article you want to retrieve in place of `:id`.

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Response

```json
{
    "id": "123456",
    "title": "Article Title",
    "content": "Article content goes here.",
    "author_id": "789012",
    "category_id": "345678",
    "imageURL": "http://example.com/article_image.jpg"
}
```





