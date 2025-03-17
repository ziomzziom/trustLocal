const express = require('express');
const router = express.Router();

const createController = require('./controllers/create');
const getController = require('./controllers/get');
const updateController = require('./controllers/update');
const searchController = require('./controllers/search');
const deleteController = require('./controllers/delete');

router.post('/create', createController.create);
router.get('/', getController.getAll);
router.get('/search', searchController.search);  
router.get('/:id', getController.getOne);      
router.put('/:id', updateController.update);
router.delete('/:id', deleteController.deleteOffer);

module.exports = router;
