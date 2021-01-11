module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    let apiUrl = '/api/v1';

    // Create a new Note
    app.post(apiUrl + '/products', products.create);

    // Retrieve all Notes
    app.get(apiUrl + '/products', products.findAll);

    // Retrieve a single Note with noteId
    app.get(apiUrl + '/products/:productId', products.findOne);

    // Update a Note with noteId
    app.put(apiUrl + '/products/:productId', products.update);

    // Delete a Note with noteId
    app.delete(apiUrl + '/products/:productId', products.delete);
}
