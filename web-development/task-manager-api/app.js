const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const app = express();
const Task = require("./models/task");

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task-manager-api')
.then(() => console.log("MONGODB connected"))
.catch(err => console.log("MONGODB connection error:", err));

app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    });

    app.post("/tasks", async (req,res) => {
        try {
            const task = new Task({
                title: req.body.title,
                completed: req.body.completed || false
            });
            await task.save();
            res.json(task);
        } catch (err) {
            res.send(500).json({ message: err.message });
        }
        });

        app.put("/tasks/:id", async (req, res) => {
            try {
                const updatedTask = await Task.findByIdAndUpdate(
                    req.params.id,
                    {
                        title: req.body.title,
                        completed: req.body.completed === true || req.body.completed === "true"
                    },
                    { returnDocument: "after" }
                );
                res.json(updatedTask);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.delete("/tasks/:id", async (req, res) => {
            const { id } = req.params;
            try {
                await Task.deleteMany({});
                res.json({ message: "All tasks deleted" });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})