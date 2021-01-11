const mongoose = require('mongoose');
const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price,
        updated_at: new Date()
    });

    // Save Note in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price,
        updated_at: new Date()
    }, {new: true})
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.productId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};
