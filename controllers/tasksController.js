const express= require('express')
const tasks = express.Router({ mergeParams: true })
const{ authenticateToken}= require('../auth/auth.js')

const {getAllTasks,getTasks,createTask,updateTask,deleteTask}= require("../queries/tasks")

tasks.get('/', authenticateToken, async (req, res) => {
    try {
        const { user_id } = req.params
        const tasks = await getAllTasks(user_id)
        res.status(200).json(tasks)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

tasks.get('/:id',authenticateToken, async (req, res) => {
    const { id, user_id } = req.params
    try {
        const task = await getTasks(id, user_id)
        res.status(200).json(task)
    } catch (err) {
        res.status(404).json({ error: err })
    }
})

 
tasks.post('/',authenticateToken, async (req,res)=>{
    try{
        const createdTask = await createTask(req.body)
        res.status(201).json(createdTask)


    }catch(err){
      res.status(500).json({error : err})
    }
})



tasks.put('/:id',authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        const updatedTask = await updateTask(id, req.body)
        res.status(200).json(updatedTask)
    } catch (err) {
        res.status(404).json({ error: err})
    }
})



tasks.delete('/:id',authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
      const deletedTask= await deleteTask(id)
        res.status(200).json({ success: "Successfully deleted task"})
    } catch (err) {
        res.status(404).json({ error: err })
    }
})
module.exports= tasks