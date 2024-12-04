const Bill = require('../models/Bill');

class BillController{
    index(req,res){
        res.render('add_dish')
    }
}

module.exports = new BillController;
