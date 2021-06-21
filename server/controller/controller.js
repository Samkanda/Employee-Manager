var Userdb = require('../model/model.js');
const multer = require('multer');
const express = require("express");
const route = express.Router();



//create and save new user
exports.create =  (req, res) => {
    console.log(req.file)
    if(!req.body)
    {
        res.status(400).send({message : "Content can not be empty"});
        return;
    }
    // new user
    const user = new Userdb ({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        avatar: req.file.path
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "Error occured in create operation"
            });
        });
}

//Retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not found user"})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error retrieving user with id"})
        })
    }else{
        Userdb.find()
            .then(user => {
            res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error while retrieving data"})
    })
    }
}

//Update a new identified user by user id
exports.update = (req, res) => {
    if(!req.body)
    {
        return res
        .status(400)
        .send({message : "Update Data empty"})
    }
    
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot Update user with ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update user information"})
        })
        
}

//Delete a user with a specified user id
exports.delete = (req, res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
        .then (data => {
            if (!data){
                res.status(404).send({message: `Cannot Delete with id ${id}`})
            }else{
                res.send({
                    message:"User was deleted succesfully!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete User with id"
            });
        });
}