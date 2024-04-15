# Category Spec Api

## Create Category

### Endpoint

- **Method:** POST
- **URL:** `/category`

### Requestment

- **NOTE:** use admin email account admin1@gmail.com, admin2@gmail.com

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Request Body

```json
    {
        "name" : "example"
    }
```

## Update Category

### Endpoint

- **Method:** PUT
- **URL:** `/category/:id`

### Requestment

- **NOTE:** use admin email account admin1@gmail.com, admin2@gmail.com

### Example ID Parameter

- `wqste2387e128fv2132r3r`

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Request Body

```json
    {
        "name" : "example"
    }
```

## Delete Category

### Endpoint

- **Method:** DELETE
- **URL:** `/category/:id`

### Requestment

- **NOTE:** use admin email account admin1@gmail.com, admin2@gmail.com

### Example ID Parameter

- `wqste2387e128fv2132r3r`

##### Headers
- **Authorization:** Bearer token_here (Use token obtained after successful login)

### Response succes

```json
    {
        "name" : "succes delete category"
    }
```

## Get Category

### Endpoint

- **Method:** GET
- **URL:** `/category/`


### Ouput

```json
    {
        "name" : "example"
    }
```

## Get Category By Id

### Endpoint

- **Method:** GET
- **URL:** `/category/:id`

### Example ID Parameter

- `wqste2387e128fv2132r3r`


### Ouput

```json
    {
        "name" : "example"
    }
```