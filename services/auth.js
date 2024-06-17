const jwt = require("jsonwebtoken");
const secretkey = "Ran12$&uim^%"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role:user.role,
    }, secretkey);
}

function getUser(token) {
    try {
        return jwt.verify(token,secretkey);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}