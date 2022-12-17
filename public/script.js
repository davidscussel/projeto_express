

let pagLogin=document.getElementById("wrapper")
    inEmail=document.getElementById("inEmail"),
    inSenha=document.getElementById("inSenha"),
    butEntrar=document.getElementById("butEntrar"),
    teste=document.getElementById("teste"),
    indErro=document.getElementById("indErro");
    
    
    


function carXml (metodo,url,dado){
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
butEntrar.addEventListener('click', ()=>{
    event.preventDefault();
    console.log('vaibomba');
    if(inEmail.value.length<4||inSenha.value.length<4){
        indErro.innerHTML="Preencher os campos corretamente.";
        indErro.style.display="block";
        inEmail.style.border="2px solid red";
        inSenha.style.border="2px solid red";
    }
    else{
        indErro.style.display="none";
        inEmail.style.border="1px solid #dddfe2";
        inSenha.style.border="1px solid #dddfe2";
        let logJson={email: inEmail.value,
            password: inSenha.value},
            inTexto=JSON.stringify(logJson);
        async function vai(){
            let resp= await carXml("POST", '/login',inTexto);
            if(resp=='200'){
                window.location='http://localhost:3000';
            }
            else{
               
            }
        }
        vai();
    }
});





