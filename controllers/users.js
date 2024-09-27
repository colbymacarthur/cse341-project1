const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=[Hello World]
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=[Hello World]
    const userId = ObjectId.createFromHexString(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
};

const createUser = async (req, res) => {
    //#swagger.tags=[Hello World]
    const user = {
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        color: req.body.color,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user); 
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Unable to create user');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=[Hello World]
    const userId = ObjectId.createFromHexString(req.params.id);
    const user = {
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        color: req.body.color,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || {message: 'Unable to update user'});
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=[Hello World]
    const userId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || {message: 'Unable to delete user'});
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};