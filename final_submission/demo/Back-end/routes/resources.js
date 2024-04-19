var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var order_controller = require('../controllers/orders');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Order.
router.post('/orders', order_controller.order_create_post);
// DELETE request to delete Order.
router.delete('/orders/:id', order_controller.order_delete);
// PUT request to update Order.
router.put('/vehicles/:id', order_controller.order_update_put);
// GET request for one Order.
router.get('/vehicles/:id', order_controller.order_detail);
// GET request for list of all Orders.
router.get('/vehicles', order_controller.order_list);
module.exports = router;