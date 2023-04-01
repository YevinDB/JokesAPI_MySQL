require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const {json} = require("express");
const {listen} = require("express/lib/application");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

//Middleware
app.use(express.json());
app.use(cors());

// Redirect requests to endpoint starting with /jokes to routes_jokes.js
app.use("/jokes", require("./routes/routes_jokes"));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went really wrong",
    });
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRUD API with MySQL",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and NodeJS, and documented with Swagger",
            contact: {
                name: "Yevin Bogahawatte",
                email: "ybogahawatte2003@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3001",
                url: "http://20.10.27.64:3001",
            },
        ],
    },
    apis: ["./routes/routes_jokes.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);


//Listen on PC Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));