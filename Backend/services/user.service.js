const userModel = require('../models/user.model');

module.exports.createUser = async({
    empNo,
    password
}) => {
    if(!empNo || !password){
        throw new Error('All fields are required.')
    }
    const user = userModel.create({
        empNo,
        password
    })
    return user;
}