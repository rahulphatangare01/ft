# 💰 Financial Tracker - Backend

## 📖 Overview


This backend application is designed to support a Personal Financial Tracker. It helps users manage their finances by allowing them to:

- Authenticate securely using JWT tokens.

- Create and manage budget categories.

- Add and track income and expense transactions.

- View summarized financial data like total income, expenses, and balance.

- Analyze spending patterns through category-wise and monthly expense breakdowns (suitable for graph representation).


**Built using:**

- Node.js

- Express

- Sequelize ORM

- MySQL

- JWT (Authentication)

## 🚀 Setup Instructions

1. Clone the repository

2. Install dependencies:

```jsx harmony
npm install
```
3. Create a .env file and configure:

```jsx harmony 
PORT=5000
DB_NAME=financial-tracker
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
JWT_SECRET=sfsfsdsRahulDVF
JWT_EXPIRE_IN=1d
```

4. Run migrations/sync the database (based on your setup):

```jsx harmony 
npm start
```


## 🔐 Authentication 

### ✅ Register 🔌

method : `POST`

EndPoint :  `/api/auth/register`

`Payload`:

```jsx harmony 
{
  "name": "Rahul Phatangare",
  "email": "rahul@gmail.com",
  "mobileNo": "1234567890",
  "password": "Pass@1234"
}
```


 ### ✅ Login 🔌

method : `POST`

EndPoint :  `/api/auth/login`

`Payload`:

```jsx harmony 
{
    "identifier": "rahul@gmail.com",
    "password": "Pass@1234"
}
```
## 📂 Budget Category API (Authenticated)


 ### ✅ Create Category


method : `POST`

EndPoint :  `/api/budget-category`

`Payload`:

```jsx harmony 
{
  "category": "Investment",
  "amount": 25000
}
```

 ### ✅ Get All Category


method : `GET`

EndPoint :  `/api/budget-category`

Header : Authrization Token 


 ### ✅ Get All Category


method : `GET`

EndPoint :  `api/budget-category/:id`

Header : Authrization Token 

 ### ✅ Update Category


method : `PUT`

EndPoint :  `api/budget-category/:id`

Header : Authrization Token 

`Payload`:
```jsx harmony 
{
  "category": "Food",
  "amount": 1100
}
```
 ### ✅ Delete Category


method : `DELETE`

EndPoint :  `/api/budget-category/:id`

Header : Authrization Token 

## 💸 Transactions API (Authenticated)

### ✅ Create Transaction

method : `POST`

EndPoint :  `/api/transaction`

`Payload`:

```jsx harmony 
{
  "type": "expense",
  "amount": 102,
  "categoryId": "56f015fe-77f4-4db6-a554-b0b1ec9c4407",
  "description": "Food",
  "date": "2025-04-10"
}

```


### ✅ Get All Transaction


method : `GET`

EndPoint :  `/api/transaction`

Header : Authrization Token 


### ✅ Update Transaction


method : `PUT`

EndPoint :  `/api/transaction/:id`

Header : Authrization Token 

`Payload` :

```jsx harmony 

{
  "type": "expense",
  "amount": 111,
  "categoryId": "56f015fe-77f4-4db6-a554-b0b1ec9c4407",
  "description": "Food",
  "date": "2025-04-10"
}
```

### ✅ Delete Transaction


method : `DELETE`

EndPoint :  `/api/transaction/:id`

Header : Authrization Token 



## 📊 Summary API (Authenticated)


### ✅ Total Summary

method : `GET`

EndPoint :  `/api/summary/totals`

Header : Authrization Token 



### ✅ Category Expense

method : `GET`

EndPoint :  `/api/summary/category-expense`

Header : Authrization Token 


### ✅ Monthly Expense

method : `GET`

EndPoint :  `/api/summary/monthly-expense`

Header : Authrization Token 


📌 Notes
All /api/* routes except /auth require Bearer token authentication.

Use Postman or any API client to test APIs.

http://13.233.193.236/