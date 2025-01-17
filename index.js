import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.port || 3000;

//SIMPLE CRUD APPLICATION - NO DATABASE

app.use(express.json());

let teaData = [];
let nextId = 1;

//Add a new tea  - Create
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//Get all Tea -Read
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//Get a Tea with Id -Read
app.get("/teas/:anything", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.anything));

  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    return res.status(200).send(tea);
  }
});

//Update each tea  -Update
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//Delete Tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send(`Tea with id ${req.params.id} has been deleted`);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
