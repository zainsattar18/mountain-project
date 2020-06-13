const express = require("express")
const bodyParser = require("body-parser")
const logger = require("morgan")
const PORT = process.env.PORT || 3000
const db = require("./db/connection")
const Post = require("./models/post")

const app = express()

app.use(bodyParser.json())
app.use(logger("dev"))

db.on("error", console.error.bind(console, "MongoDB Connection error:"))

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

app.get("/", (req, res) => res.send("This is the climbing homepage!"))

app.get("/climb", async (req, res) => {
  try {
    const climb = await Post.find()
    res.json(climb)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/climb/:id", async (req, res) => {
  try {
    const { id } = req.params
    const climb = await Post.findById(id)
    if (!climb) throw Error("Climb not found")
    res.json(climb)
  } catch (e) {
    console.log(e)
    res.send("Climb not found")
  }
})

app.post("/climb", async (req, res) => {
  try {
    const climb = new Post(req.body)
    await climb.save()
    res.status(201).json(climb)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.put("/climb/:id", async (req, res) => {
  const { id } = req.params
  await Post.findByIdAndUpdate(id, req.body, { new: true }, (error, post) => {
    if (error) {
      return res.status(500).json({error:error.message})
    }
    if (!post) {
      return res.status(404).json({message:"Climb NOT FOUND"})
    }
    res.status(200).json(post)
  })
})

app.delete("/climb/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Climb is deleted")
    }
    throw new Error("Climb not found")
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})