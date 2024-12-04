const Dish = require('../models/Dish');

class DishController{
    index(req,res){
        res.render('add_dish')
    }
}

module.exports = new dishController;
