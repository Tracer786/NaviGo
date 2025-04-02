const userModel = require('../models/user.model');

module.exports.createUser = async({
    firstname, lastname, email, password  //this function will accept these 4 things in form of object
}) => {
    if (!firstname || !email || !password)
    {
        throw new Error('All fields are required');
    }
    //now the else condition
    //await is suggested by GPT -> asynchronous function
    const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}