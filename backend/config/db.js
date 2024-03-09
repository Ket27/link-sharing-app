const mongoose = require('mongoose');

const connectdB = async function(){
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo Connected: ${conn.connection.host}`);
    }

    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectdB;