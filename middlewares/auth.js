const { getUser } = require("../services/auth");

function checkForAuthuntication(req, res, next) {
    const tokencookie = req.cookies?.uid;
    req.user = null;

    if (!tokencookie)
        return next();

    const user = getUser(tokencookie);
    
    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user)
            return res.redirect("/login");
        if (!roles.includes(req.user.role))
            return res.redirect("/login");
        return next();
    }
}

module.exports = {
    checkForAuthuntication,
    restrictTo,
}

// async function restrictUserWithoutLogin(req, res, next) {
//     // //Token as cookies
//     const userUid = req.cookies?.uid;

//     if (!userUid)
//         return res.redirect("/login");
//     const user = getUser(userUid);

//     if (!user)
//         return res.redirect("/login");

//     req.user = user;
//     next();

    // //Token as Headers
    // const userUid = req.headers["authorization"];

    // if (!userUid)
    //     return res.redirect("/login");

    // const token = userUid.split("Bearer ")[1];
    // const user = getUser(token);

    // if (!user)
    //     return res.redirect("/login");

    // req.user = user;
    // next();
// }

// async function checkAuth(req, res, next) {
    //Token as cookies
    // const userId = req.cookies?.uid;

    // const user = getUser(userId);

    // req.user = user;
    // next();

        //Token as Headers
//     const userUid = req.headers["authorization"];

//     const token = userUid?.split("Bearer ")[1];
//     const user = getUser(token);

//     req.user = user;
//     next();
// }