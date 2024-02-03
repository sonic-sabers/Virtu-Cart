# VirtuCart

# Author
Ashish Gupta

## Description

VirtuCart is an e-commerce and billing application.

## Technologies Used

### Frontend
- ReactJS
- TypeScript
- Redux
- TailwindCSS
- Material UI

### Backend
- Node.js
- Express.js
- MongoDB
- Jest

## Getting Started

To run this project locally, you'll need to follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/sonics/virtucart.git
```

2. Install the required dependencies for both the frontend and backend:

```bash
cd virtucart/client
yarn install

cd ../server
yarn install
```

3. Create a `.env` file in the `server` directory and add the following:

```env
MONGODB_URI=<your_mongodb_uri>
```

Replace `<your_mongodb_uri>` with your actual MongoDB Atlas connection string.

## Running the Application

### Frontend

To run the frontend locally, use the following command:

```bash
cd client
yarn dev
```

This will start the React development server.

### Backend

To run the backend locally, use the following command:

```bash
cd server
yarn start
```

This will start the Node.js server.

## Testing

Server unit tests are located in the `server/test` folder and are created using Jest.

To run the tests, use the following command:

```bash
cd server
yarn run test
```

## Server Information

The server is hosted at [Cyclic.sh](https://www.cyclic.sh/). The API URL is encoded in the `.env` file of the client application.

## Website

The live version of the website can be found at [https://virtuecart.vercel.app/](https://virtucart.vercel.app/).

# For testing purpose on the live website, login using the credentials

## Email - testuser@gmail.com 
## Password - 1234

## Additional Information

- Server Port: 9000
- Server API URL: [http://localhost:9000/api/](http://localhost:9000/api/)

## License

This project is licensed under the [MIT License](LICENSE).
