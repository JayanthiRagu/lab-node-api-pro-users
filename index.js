const express=require('express')
const app=express()
app.use(express.json())
const mongoose=require('mongoose')
const url="mongodb+srv://admin:admin@cluster0.izyvf.mongodb.net/firstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
const data=require('./app')

//posting user details
app.post('/api/users',async function(req,res){
    try{
        if(req.body.email==undefined||req.body.name==undefined)
        {
            throw "missing"
        }
        const user=await new data(req.body)
        await user.save()
        res.status(201)
        res.send(user)
    }
    catch(e){
        if(e=="missing")
        {
            res.status(400)
            res.json({message:"Please provide name and bio for the user."})
             
        }
        else{
            res.status(500)
            res.json({message:"There was an error while saving the user to the database"})
        }
    }
    finally{
        res.end()
    }
})

//get list of users
app.get('/api/users',async function(req,res){
    try{
        const user=await data.find()
        res.send(user)
    }
    catch(error)
    {
        res.status(500)
        res.json({message:"The user information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

//get user details with mentioned id
app.get('/api/users/:id',async function(req,res){
    try{
        const user=await data.find({"prograd_id":req.params.id})
        if(user.length!=0)
        res.send(user)
        else
        {
            res.status(404)
            res.send("The user with the specified ID does not exist.")
        }
    }
    catch(error)
    {
        res.status(500)
        res.json({message:"The user information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

//Update user detail based on id
app.put('/api/users/:id',async function(req,res){
    try{
        if(req.body.email==undefined||req.body.name==undefined)
        {
            throw "missing"
        }
        const user=await data.updateOne({"prograd_id":req.params.id},req.body)
        if(user.length!=0){
            res.status(200)
            res.send(user)
        }
        else
        {
            res.status(404)
            res.send("The user with the specified ID does not exist.")
        }
    }
    catch(e)
    {
        if(e=="missing")
        {
            res.status(400)
            res.json({message:"Please provide name and bio for the user."})
             
        }
        else{
            res.status(500)
            res.json({message:"The user information could not be retrieved."})
        }
    }
    finally{
        res.end()
    }
})


//Delete user detail based on id
app.delete('/api/users/:id',async function(req,res){
    try{
        const user=await data.findOneAndDelete({"prograd_id":req.params.id})
        if(user){
            res.status(200)
            res.send(user)
        }
        else
        {
            res.status(404)
            res.send({message:"The user with the specified ID does not exist."})
        }
    }
    catch(e)
    {
        res.status(500)
        res.json({message:"The user information could not be retrieved."})
    }
    finally{
        res.end()
    }
})

app.listen(5000,()=>console.log("Server running"))