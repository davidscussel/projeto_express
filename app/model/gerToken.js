module.exports= class gerToken{
    static  token(tam){
        let obj='ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvwxyz0123456789',
            str,
            i=0;
        for(i=0;i<tam;i++){
            str+=obj.charAt(Math.floor(Math.random()*obj.length));   
        }
        return str;
    }
}