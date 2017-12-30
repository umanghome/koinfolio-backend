## Dev Setup

`npm i` first, obviously.

To start dev server: `npm run start`

To run `eslint`: `npm run lint` (Please do this before every merge.)

To build prod files: `npm run build`

To start prod server: `npm run serve`

---

## Documentation

All API calls except for `/user` require a header with the user ID for authentication.
```
USER: xyzABC123
```

---

### Add or retrieve a user

`POST /user`

Request
```
{
  "email": "john@doe.com",
  "name": "John Doe"
}
```

Response `200 OK`
```
{
  "success": true,
  "name": "John Doe",
  "user_id": "xyzABC123"
}
```

---

### Get all transactions

`GET /passbook`

Response `200 OK`
```
{
  "success": true,
  "passbook": {
    "BTC": [
      {
        "id": "ABCxyz123",
        "qty": 0.0123,
        "price": 98000000
      },
      {
        "id": "ABCxyz124",
        "qty": 0.0123,
        "price": 98000000
      },
      {
        "id": "ABCxyz126",
        "qty": -0.01,
        "price": 120000000
      }
    ],
    "INR": [
      {
        "id": "ABCxyz125",
        "qty": 1000000,
        "price": 100
      }
    ]
  }
}
```

---

### Add or update a transaction

`POST /transaction`

Request (to add)
```
{
  "success": true,
  "type": "INR",
  "qty": 10000000,
  "price": 100
}
```

Request (to update)
```
{
  "success": true,
  "id": "ABCxyz127"
  "type": "INR",
  "qty": 10000000,
  "price": 100
}
```

Response `200 OK`
```
{
  "success": true,
  "id": "ABCxyz127"
  "type": "INR",
  "qty": 10000000,
  "price": 100
}
```

---

### Delete a transaction

`DELETE /transaction`

Request
```
{
  "id": ABCxyz127
}
```

Response `200 OK`
```
{
  "success": true
}
```