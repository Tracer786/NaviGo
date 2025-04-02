const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname, lastname, email, passowrd  //this function will accept these 4 things in form of object
}) => {
    if (!firstname || !email || !password)
    {
        throw new Error('All fields are required');
    }
    //now the else condition
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}