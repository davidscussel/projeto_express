let http=
    butCad=document.getElementById("butCad"),
    crEmail=document.getElementById("crEmail"),
    crUser=document.getElementById("crUser"),
    crSenha=document.getElementById("crSenha"),
    confSenha=document.getElementById("confCrSenha"),
    cadErro=document.getElementById("cadErro");

    async function carXml (metodo,url,dado){
    let x;
    let minhaPromessa = new Promise(function(valor){ 
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open(metodo,url,true);
    if(metodo=='POST')
        xmlhttp.setRequestHeader("Content-Type","application/json");
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200)
            valor(xmlhttp.responseText);
        else if(xmlhttp.readyState==4 && xmlhttp.status==300)
            valor(xmlhttp.responseURL);
        else if(xmlhttp.readyState==4)
            valor("ERRO: "+xmlhttp.status);
    }
    xmlhttp.send(dado);
    });
    x=minhaPromessa;
    return x;
    }

butCad.addEventListener('click', ()=>{
    event.preventDefault();
    if(crEmail.value.length<4||crSenha.value.length<4||crUser.value.length<4||confSenha.value.length<4){
        cadErro.innerHTML="Preencha corretamente os campos em destaque.";
        if(crEmail.value.length<4){
            crEmail.style.border="2px solid red";
        }
        if(crSenha.value.length<4){
            crSenha.style.border="2px solid red";
        }
        if(crUser.value.length<4){
            crUser.style.border="2px solid red";
        }
        if(confSenha.value.length<4){
            confSenha.style.border="2px solid red";
        }
    }
    else if(crSenha.value!=confSenha.value){
        cadErro.innerHTML="Senhas diferentes!";
    }
    else{
        let txtJson={email: crEmail.value,
            usuario: crUser.value,
            senha: crSenha.value},
            inString=JSON.stringify(txtJson);
        async function vai(){
            let resp= await carXml('POST','/cad',inString);
            console.log(resp);
            if(resp=='300')
                window.location.href='http://localhost:3000';
            else if(resp=='401'){
                crEmail.style.border="2px solid red";
                crUser.style.border="2px solid red";
                cadErro.innerHTML="Já existe este email e usuário cadastrados.";
            }
            else if(resp=='402'){
                crEmail.style.border="2px solid red";
                cadErro.innerHTML="Já existe este email cadastrado.";
            }
            else if(resp=='403'){
                crUser.style.border="2px solid red";
                cadErro.innerHTML="Já existe este usuário cadastrado.";
            }
        }
        vai();
    }
});