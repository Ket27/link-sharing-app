const jwt = require("jsonwebtoken");

module.exports.validateUser = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.json({
                    message: "User is not authorized"
                });
            } else {
                console.log(user);
                req.user = user.user;
                next();
            }
        });
    } else {
        res.json({
            message: "No token present"
        });
    }
};
