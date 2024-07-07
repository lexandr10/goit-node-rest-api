# goit-node-rest-api

## Features

- **User Authentication**: Registration, login, and user profile management.
- **Contact Management**: Create, update, delete, get contact by id, and view contacts.
- **favorite**: Add contacts to favorites.
- **User avatar**: Add avatar for profile or update.

## Technologies and Libraries

This project uses the following technologies and libraries:

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB.
- **Passport**: Authentication middleware for Node.js.
- **JSON Web Token (JWT)**: For secure authentication.
- **Multer**: Middleware for handling `multipart/form-data`.
- **Joi**: For data validation.
- **dotenv**: For managing environment variables.
- **Morgan**: HTTP request logger middleware.
- **cors**: For enabling Cross-Origin Resource Sharing.

1. **Clone the repository:**
```sh
git clone https://github.com/lexandr10/goit-node-rest-api.git
cd goit-node-rest-api
```

2. **Install dependencies:**
```sh
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add the necessary environment variables:
```env
DB_HOST=your_database_host
JWT_SECRET=your_jwt_secret
```

4. **Start the server:**
```sh
npm start
```

For development, use:
```sh
npm run dev
```

The server will be available at `http://localhost:4000`.

## Usage

1. **Register or Log In:**
    - Use the provided API endpoints to register a new user or log in with existing credentials.

2. **Manage Contacts:**
    - Use the API to create, update, delete, and view contacts.

3. **Manage Favorites:**
    - Add and remove contacts from your favorites list using the appropriate endpoints.

4. **Follow Users:**
    - Follow and unfollow other users using the provided API endpoints.
  
## API Endpoints

### User Routes

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in a user.
- `GET /api/users/current`: Get current logged-in user.
- `PATCH /api/users`: Update subscription.
- `PATCH /api/users/avatars`: Update avatar.
- `POST /api/users/logout`: Log out a user.

### Contacts Routes

- `GET /api/contacts`: Get all contacts.
- `GET /api/contacts/:id`: Get one contact.
- `DELETE /api/contacts/:id`: Delete one contact.
- `POST /api/contacts`: Create contact.
- `PUT /api/contacts`: Update contact.
- `PATCH /api/contacts/:id/favorite`: Update favorite.

## Contributors
- [Oleksandr Oleksandrenko - developer](https://github.com/lexandr10)
