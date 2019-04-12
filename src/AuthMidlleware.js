


class AuthMidlleware{
    static hasValidAthorization(req, res, next){

        if(!(req.headers.authorization && req.headers.authorization === "TmlxdWUgdGEgbWFyZQ==")){
            return next({
                status: 401,
                message:"Vous n'avez aucun droit d'être ici, à partir de desormais vous êtes fiché et poursuivi par la Russie"
            });
        }
        next();

    }
}

module.exports = AuthMidlleware;