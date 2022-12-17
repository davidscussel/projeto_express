module.exports = class conHttp {
    static carXml (metodo,url,dado){
    let x;
    let minhaPromessa = new Promise(function(valor){ 
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open(metodo,url,true);
    if(metodo=='POST')
        xmlhttp.setRequestHeader("Content-Type","application/json");
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200)
            valor(xmlhttp.responseText);
        else if(xmlhttp.readyState==4)
            valor("ERROR: "+xmlhttp.status);
    }
    xmlhttp.send(dado);
});
x=minhaPromessa;
return x;
}
}