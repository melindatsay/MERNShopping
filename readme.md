### MERN Stack Furniture Shopping Web Application
### Video Demonstration https://youtu.be/TwfA7A-vcrw
### Landing Page Screenshot
[](url)
![screencapture-127-0-0-1-3000-2023-08-22-23_49_56](https://github.com/melindatsay/MERNShopping/assets/22477611/fe1dd683-1f3b-4f19-9c66-a833fee0ba75)
### Product Page Screenshot
![screencapture-127-0-0-1-3000-products-2023-08-22-23_57_44](https://github.com/melindatsay/MERNShopping/assets/22477611/7940c44f-4ffb-4765-b265-f589bf78abb8)
### .env preparation

Rename `example.env` file to `.env` and fill the following items.

```python
NODE_ENV =development
PORT = 5000
MONGO_URI = "ADD_YOUR_MONGO_URI"
JWT_SECRET = "ADD_YOUR_JWT_SECRET"
STRIPE_KEY = "ADD_YOUR_STRIPE_API_KEY"
CLIENT_URL = http://localhost:3000

STRIPE_WEB_HOOK = "ADD_YOUR_STRIPE_WEBHOOK"
```

### Installation:

```python
git clone https://github.com/melindatsay/MERNShopping
cd MERNShopping

#install backend
npm install

cd frontend
#install frontend
npm install
```

### Seed Database

1.  Add `MONGO_URI` in `.env` before seeding database
2.  `MONGO_URI` can be found in MongoDB Atlas after creating database. Replace `username`, `password` and `database`

```python
MONGO_URI = mongodb+srv://{username}:{password}@cluster0.cil7kv0.mongodb.net/{database}?retryWrites=true&w=majority
```

3. Seed the database with sample products and users

```python
  # Import data
npm run data:import
```

### Run

```python
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only. Run again after every change at backend
npm run server
```

Go to http://localhost:3000/ for the app.
