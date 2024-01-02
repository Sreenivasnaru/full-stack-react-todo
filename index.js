
const express = require('express');
const { createTodo, updateTodo} = require('./types');
const { todo } = require('./db');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
})); 

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


app.post('/todo', async function(req, res)  {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json ({
        msg: "You sent the wrong input" 
    })
    return;
  }

  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  })

  res.json({
    msg: "Todo has created"
  })
});

app.get('/todos', async function(req, res)  {
    const todos = await todo.find({})
 
        res.json({
        todos 
    })
});


app.put('/completed', async function(req, res)  {
    const updateTodo = req.body;
  const parsedPayload = updateTodo.safeParse(updateTodo);
  if (!parsedPayload.success) {
    res.status(411).json ({
        msg: "You sent the wrong input" 
    })
    return;
  }

  await todo.update({
    _id: req.body.id
  }, {
    completed: true
  })

  res.json({
    msg: "Todo marked as completed"
  })
});







