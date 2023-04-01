const express = require("express");
const {getJokes, postJokes, deleteJokeById, getRandomJoke, getRandomJokeByType} = require("../controllers/controllers_jokes");


router = express.Router();

/**
 * @openapi
 *
 * /jokes/get:
 *   get:
 *     summary: Retrieve all jokes from MySQL Database.
 *     tags:
 *       - Jokes
 *     description: Returns an array of all jokes.
 *     responses:
 *       200:
 *         description: Array of jokes retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jokes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       setup:
 *                         type: string
 *                         description: The setup part of the joke.
 *                       punchline:
 *                         type: string
 *                         description: The punchline part of the joke.
 *                       type:
 *                         type: string
 *                         description: The type of the joke.
 *         example:
 *           jokes:
 *             - setup: "What did the Titanic say as it sank?"
 *               punchline: "I’m nominating all passengers for the Ice Bucket Challenge!"
 *               type: "Dad Jokes"
 *             - setup: "What do you call a fish wearing a bowtie?"
 *               punchline: "Sofishticated."
 *               type: "Dad Jokes"
 *       500:
 *         description: Internal server error occurred while retrieving jokes.
 */


router.get("/get", getJokes);


/**
 * @openapi
 * /jokes/getRandom:
 *   get:
 *     summary: Finds a random joke from the MySQL Database
 *     tags:
 *       - Jokes
 *     description: Retrieves a random joke from the "jokes" table in the "jokes_db" MySQL database.
 *     responses:
 *       200:
 *         description: A randomly selected joke.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         description: The type of the joke.
 *                       setup:
 *                         type: string
 *                         description: The setup of the joke.
 *                       punchline:
 *                         type: string
 *                         description: The punchline of the joke.
 *       404:
 *         description: The requested resource could not be found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful.
 *                   example: false
 *                 data:
 *                   type: array
 *                   items: []
 *                   description: An empty array.
 *                 error:
 *                   type: string
 *                   description: The error message returned by the server.
 */


router.get("/getRandom", getRandomJoke);


/**
 * @openapi
 * /jokes/getRandomByType/{type}:
 *   get:
 *     summary: Get a random joke by type
 *     tags:
 *       - Jokes
 *     description: Get a random joke from a specific type in the MySQL Database
 *     parameters:
 *       - in: path
 *         name: type
 *         description: The type of joke to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       setup:
 *                         type: string
 *                       punchline:
 *                         type: string
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 error:
 *                   type: string
 *                   example: Joke not found
 */

router.get("/getRandomByType/:type", getRandomJokeByType);


/**
 * @openapi
 * /jokes/post:
 *   post:
 *     summary: Posts a joke to the MySQL Database
 *     tags:
 *       - Jokes
 *     description: This endpoint allows you to create a new joke and save it to the MySQL Database.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: number
 *               setup:
 *                 type: string
 *               punchline:
 *                 type: string
 *     responses:
 *       201:
 *         description: Joke created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Joke created message
 *                   example: Joke Created
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Joke Not Created
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */


router.post("/post", postJokes);

module.exports = router;