# User Spec Api

## Register

### Endpoint

- **Method:** POST
- **URL:** `/auth/register`

### User Type

- **username:** string Minimum 3 characters.
- **email:** string Valid email address.
- **password:** string Minimum 8 characters, must contain a combination of numeric, alphabetic, and special characters.

### Request Body

```json
{
  "username": "test",
  "email": "test@gmail.com",
  "password": "@test123"
}
```

#### Register Succes

```json
{
  "message": "succes"
}
```

#### Register Failed Use Same Email

```json
{
  "message": "Error saat membuat pengguna: Email sudah terdaftar"
}
```

## Login

### Endpoint

- **Method:** POST
- **URL:** `/auth/login`

### Request Body

```json
{
  "email": "test@gmail.com",
  "password": "@test123"
}
```

## Get Users

- **Method:** GET
- **URL:** `/user`
- **NOTE:** use admin email account admin1@gmail.com, admin2@gmail.com

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Example Output

```json
[

    {
        "id": "ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a",
        "username": "test",
        "email": "test@gmail.com",
        "password": "$2b$10$cqb5euDS/PgGJ3Xze8RtOOqHEbX7pTM77t.wMTiJh9d1Xz2a7vUbW",
        "role": "user"
    }
]
```

## Get User By ID

### Endpoint

- **Method:** GET
- **URL:** `/user/:id`

### Example ID Parameter

- `ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a`

#### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Example Output

```json
[
    {
        "id": "ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a",
        "username": "test",
        "email": "test@gmail.com",
        "password": "$2b$10$cqb5euDS/PgGJ3Xze8RtOOqHEbX7pTM77t.wMTiJh9d1Xz2a7vUbW",
        "role": "user"
    }
]
```

## Update User

### Endpoint

- **Method:** PUT
- **URL:** `/user/:id`

### Example ID Parameter

- `ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a`

#### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Request Body

```json
{
    "id" : "ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a"
    "username": "new_username",
    "email": "new_email@gmail.com",
    "password": "new_password123"
}
```

#### Succes Example

```json
{
    "message": "User updated successfully"
}

```

## Delete User

### Endpoint

- **Method:** DELETE
- **URL:** `/user/:id`

### Example ID Parameter

- `ce2ab5b7-a5c6-44db-b4aa-57ea9c6f9c6a`

#### Headers

- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Example Output

```json
{
    "message": "User deleted successfully"
}
```