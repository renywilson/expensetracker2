const Expense = require('../models/expenses');

const getExpenses=(req,where)=>{
    return req.user.getExpenses(where)
}
module.exports={
    getExpenses
}