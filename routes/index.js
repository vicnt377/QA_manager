
const billRouter = require('./bill_route');
const employeeRouter = require('./employee_route');
// const statisticRouter = require('./statistic_route');
const dishRouter = require('./dish_route');

function route (app){

    app.use('/employee',employeeRouter);
    app.use('/bill',billRouter)
    app.use('/dish',dishRouter)

}

module.exports = route;
