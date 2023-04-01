const Joke = require("../models/models_jokes")

exports.getJokes = async ( req, res, next) => {
    try {
        const [jokes, _] = await Joke.findAllJokes();

        res.status(200).json({jokes});
    }catch (error){
        console.log(error);
        next(error);
    }
}

exports.getRandomJoke = async (req, res) => {
    try{
        const [jokes,_] = await Joke.findRandomJoke();
        res.status(200).json({data: jokes});
    }catch (error){
        res.status(404).json({ success: false, data: [], error: error.message });
    }
}

exports.getRandomJokeByType = async (req, res) => {
    try{
        const [jokes,_] = await Joke.findRandomJokeByType(req.params.type);
        res.status(200).json({data: jokes});
    }catch (error){
        res.status(404).json({ success: false, data: [], error: error.message });
    }
}

exports.postJokes = async ( req, res, next) => {
    try {
        let {type, setup, punchline} = req.body;
        let joke = new Joke(type, setup, punchline);

        joke = await joke.save();
        res.status(201).json({message: "Joke Created"})
    }catch (error) {
        res.status(409).json({message: "Joke Not Created"})
        next(error);
    }
}