const express = require('express');
const route = express.Router()
const multer = require('multer');

const services = require('../services/render');
const controller = require('../controller/controller');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({storage:storage});
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/',  upload.single('avatar') , services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user',  upload.single('avatar'), services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)




// API
route.post('/api/users' , upload.single('avatar'), controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route