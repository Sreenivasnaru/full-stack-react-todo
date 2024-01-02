const mongoose  = require("mongoose"); 

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/todos");
}


main().then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
}) 

const todo = mongoose.model("todos", todoSchema);

module.exports = {
    todo
}