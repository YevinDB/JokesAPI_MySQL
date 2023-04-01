const db = require("../config/db");


class Joke {
    constructor(type, setup, punchline) {
        this.type = type;
        this.setup = setup;
        this.punchline = punchline;
    }

    async save() {
        let sql = `
        INSERT INTO jokes(
            type, 
            setup, 
            punchline
        )
        VALUES (
            '${this.type}',
            '${this.setup}',
            '${this.punchline}'
        )`;

        return db.execute(sql);
    }

    static findAllJokes(){
        let sql = "SELECT jokes_db.jokes.setup, jokes_db.jokes.punchline, jokes_db.types.type FROM jokes_db.jokes JOIN jokes_db.types ON jokes_db.jokes.type = jokes_db.types.id;"

        return db.execute(sql);
    }

    static findRandomJoke(){
        let sql = "SELECT jokes_db.types.type, jokes_db.jokes.setup, jokes_db.jokes.punchline FROM jokes_db.jokes JOIN jokes_db.types ON jokes_db.jokes.type = jokes_db.types.id ORDER BY RAND() LIMIT 1;"

        return db.execute(sql);
    }

    static findRandomJokeByType(type){
        let sql = `SELECT jokes_db.types.type, jokes_db.jokes.setup, jokes_db.jokes.punchline FROM jokes_db.jokes JOIN jokes_db.types ON jokes_db.jokes.type = jokes_db.types.id WHERE jokes_db.types.type = '${type}' ORDER BY RAND() LIMIT 1;`

        return db.execute(sql);
    }
}

module.exports = Joke;