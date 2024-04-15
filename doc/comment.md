# Comment API Spec

## Create Comment

## Endpoint

- **Method:** POST
- **URL:** `/comment`
- **NOTE:** please login before create comment

##### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

##### Request

- **Content:** string
- **User_Id**: string
- **Article_Id**: string

### Example

```json
{
  "content": "This is a comment",
  "user_id": "4387wdyhw721t31",
  "article_id": "e368vswsuv2us2"
}
```
#### Response Output

```json
{
    "message": "Comment created successfully"
} 
```

## Update Comment

## Endpoint

- **Method:** PUT
- **URL:** `/comment/:id`
- **NOTE:** Use the ID of the comment you want to update in place of :id

##### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

##### Request

- **Content:** string
- **User_Id**: string
- **Article_Id**: string

### Example

```json
{
    "id": "e37t2i7jwegdhw"
  "content": "This is update comment",
  "user_id": "4387wdyhw721t31",
  "article_id": "e368vswsuv2us2"
}
```
#### Response Output

```json
{
    "message": "Comment updated successfully"
} 
```

## Delete Comment

## Endpoint

- **Method:** DELETE
- **URL:** `/comment/:id`
- **NOTE:** Use the ID of the comment you want to update in place of :id

##### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Response

```json
{
    "message": "Comment deleted successfully"
}

```

## Get Comments

### Endpoint

- **Method:** GET
- **URL:** `/comment`

### Response

```json
[
    {
        "id": "7843rhdehdwqhw",
        "content": "This is a comment",
        "user_id": "789012",
        "article_id": "456789"
    },
    {
        "id": "783ge8gwswqfwu",
        "content": "Another comment",
        "user_id": "123456",
        "article_id": "456789"
    }
]
```

## Get Comment by ID

### Endpoint

- **Method:** GET
- **URL:** `/comment/:id`

### Response

```json
{
    "id": "q3weiqhe329eh9",
    "content": "This is a comment",
    "user_id": "789012",
    "article_id": "456789"
}
```

