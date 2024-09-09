# **Microservices Farm Management**

The "Animals and Corrals" system is designed to manage detailed information about animals and the corrals where they are housed. It allows users to track the name, age, species, whether the animal is dangerous, and any restrictions, as well as manage information related to the corrals.

## Content Table

- [**Microservices Farm Management**](#microservices-farm-management)
  - [Content Table](#content-table)
  - [Functionalities](#functionalities)
  - [Project Configuration](#project-configuration)
  - [Running the App](#running-the-app)
  - [Gitflow Branching Strategy](#gitflow-branching-strategy)
  - [Documentation](#documentation)
  - [Participant](#participant)
  - [License](#license)

## Functionalities

**Animal and Corral Management**

- Register animals and corrals with maximum capacity.
- Search for the average age of animals in a corral.
- Search for dangerous animals in a corral

**Technologies Used**

- **NestJS:** Framework for building scalable and maintainable microservices.
- **TypeScript:** Programming language that provides static typing and advanced development features.
- **MongoDB:** NoSQL database for document storage.
- **Swagger:** Tool for API documentation that facilitates the creation of interactive documentation.
- **Confluence:** Platform for team documentation and collaboration.

## Project Configuration

To run the project locally, clone the repository and set up the necessary environment variables for the database.

1. Clone the repository:

    ```bash
    git clone https://github.com/cxmi02/Farm-management-Backend.git
    cd Farm-management-Backend
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Copy the .env.example file to a new .env file and configure the necessary environment variables:

    ```bash
    cp .env.example .env
    ```

Edit the .env file and configure the following values:

    DB_CONNECTION= your connection
    DB_USER= your user
    DB_PASSWORD= your password
    DB_CLUSTER= your host
    DB_NAME= your database name
    PORT= 3000

These steps will allow you to execute the project. Additionally, you must develop the environment variables according to your needs.

## Running the App

```bash
# development
$ npm run start

# watch mode and Run Docker
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Gitflow Branching Strategy

This project follows the Gitflow strategy, a robust model for software development. Here is how the branches are organized and their purpose:

- `main:` Main branch with stable code for production.
- `dev:` Development branch with the latest features before production.
- `feat/NameTask:` Branch of tasks with functionalities, identified by to the task name.

The work is integrated into the 'dev' branch for integration testing. Once 'dev' is stable and ready to be released, it is merged into 'main'.

If you want to contribute to the project, create a new branch from 'dev' using the appropriate prefix (feat/NameTask). After finishing your work and testing, open a Pull Request towards 'dev'.

## Documentation

- **Postman:** [Link Postman](https://riwi22.postman.co/workspace/riwi-Workspace~c2b36a8d-9198-4f24-89d1-b1878a78b405/collection/33425942-ef0b2d22-2cef-4fc3-9f73-173824200f72?action=share&creator=33425942)

## Participant

María Camila Sepúlveda Giraldo - Software Developer.

- **GitHub:** [cxmi02](https://github.com/cxmi02)
- **Instagram:** [@k_amila2002](https://www.instagram.com/k_amila2002/)
- **Email:** sepulveda.giraldo.camila@gmail.com

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
