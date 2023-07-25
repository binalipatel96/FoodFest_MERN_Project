const mongoose = require('mongoose');
//mongoDB connection URI
// const mongoURI = "mongodb+srv://foodfest:foodfest123@cluster0.ryjh5ks.mongodb.net/foodfest?retryWrites=true&w=majority";
const mongoURI = "mongodb://foodfest:foodfest123@ac-t0zxk7p-shard-00-00.ryjh5ks.mongodb.net:27017,ac-t0zxk7p-shard-00-01.ryjh5ks.mongodb.net:27017,ac-t0zxk7p-shard-00-02.ryjh5ks.mongodb.net:27017/foodfest?ssl=true&replicaSet=atlas-8o1dop-shard-0&authSource=admin&retryWrites=true&w=majority";
// function to check mongoose is connected to mongoDB
const mongoDB = async() => {
    await mongoose.connect(mongoURI, { useNewUrlParser : true }, async(err, result)=>{
        if(err){
            console.log("There is an error while connecting mongoDB to mongoose", err);
        }
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            //fetch data from the database
            fetched_data.find({}).toArray(async function(err, data){

                //fetching data from food_category database
                const food_category = await mongoose.connection.db.collection("food_category");
                food_category.find({}).toArray(function(err, categoryData){
                    if(err){
                        console.log(err);
                    }
                    else{
                        //declaring a global variable we can use it anywhere in the application
                        //storing data in the global variable food_items
                        global.food_items = data;
                        global.food_category = categoryData;
                        // console.log();
                    }
                })
                
            });
        }
    });
}

module.exports = mongoDB;
