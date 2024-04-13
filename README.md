# Pokémon App

This is a simple Pokémon App built with React, TypeScript, and Vite. It uses the [PokéAPI](https://pokeapi.co/) to fetch data about Pokémon.

## Dependencies

This project uses several dependencies:

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- Axios: A promise-based HTTP client for the browser and node.js.
- React Query: A data fetching library for React.

- ## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`VITE_BASE_URL_API`: This should be the base URL of the Pokémon API. You can get this URL from the [PokéAPI](https://pokeapi.co/) website.

Here is an example of what your .env file might look like:

```env
VITE_BASE_URL_API=https://pokeapi.co/api/v2/

# Please make sure to create the .env file at the root of the project and to restart your development server after setting the environment variables.

```

## Installation

To install the dependencies, run the following command in your terminal:

```bash
npm install
# Running the Development Server
#To start the development server, run the following command in your terminal:
npm run dev
#The server will start, and you can view the application in your web browser at http://localhost:5173/

```
