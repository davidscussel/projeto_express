const banco=require('./banco');

module.exports= class cadSave{
    static async confBanco(vEmail, vUsuario, vSenha){
        let x=await banco.find({email : vEmail}),
            y=await banco.find({usuario: vUsuario}),
            z=await banco.find({senha: vSenha}),
            w;
        console.log(x);
        console.log(y);
        if(x[0]==null && y[0]==null){
            w=await banco.insert({email: vEmail,
                usuario: vUsuario,
                senha: vSenha});
            return '300';
        }
        else if(y[0]!=null && x[0]!=null){
            return '401';
        }
        else if(x[0]!=null){
            return '402';
        }
        else{
            return '403';
        }
    }
}
