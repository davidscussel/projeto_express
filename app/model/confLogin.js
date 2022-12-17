const banco = require('./banco');

module.exports = class confLogin{
    static async comp(vEmail, vSenha){
        let x=await banco.find({email : vEmail});
        if(x[0].email==vEmail && x[0].senha==vSenha)
            return '200';
        else
            return '400';
    }
}