let butBusca=document.getElementById("butBusca"),
ansView=document.getElementById("ansView"),
butSair=document.getElementById("butSair"),
inDigimon=document.getElementById("inDigimon");

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

butBusca.addEventListener('click', ()=>{
        if (inDigimon.value==""){
            inDigimon.style.border="2px solid red";
            alert("Favor escolher um Level (NÍVEL) de Digimon!");
        }
        else{
            inDigimon.style.border="#7ba7e9";
            let endereco="https://digimon-api.vercel.app/api/digimon/level/"+inDigimon.value;
            async function vamos(){
            let chegou= await carXml('GET',endereco,null),
                digAns=JSON.parse(chegou);
                while(ansView.hasChildNodes()){
                    ansView.removeChild(ansView.firstChild);
                }
                let digImg=[],
                    digPar=[],
                    digDiv=[];
            for (let i = 0; i < digAns.length; i++) {
                digImg[i]=document.createElement("img");
                digPar[i]=document.createElement("p");
                digDiv[i]=document.createElement("div");
                digImg[i].setAttribute("src",digAns[i].img);
                digPar[i].innerHTML=digAns[i].name;
                digDiv[i].appendChild(digImg[i]);
                digDiv[i].appendChild(digPar[i]);
                digDiv[i].setAttribute("style","border-radius: 10px;box-shadow: #7ba7e9 4px 4px 8px;padding:10px;margin:20px;justify-content:center;align-content:center;");
                digImg[i].setAttribute("style","width:250px;");
                digPar[i].setAttribute("style","font-size:20px; font-weight: bold;color: #1877f2;text-align:center");  
            }
            for (let i = 0; i < digAns.length; i++) {
                ansView.appendChild(digDiv[i]);
            }
        }
        vamos();
        }
    
});

butSair.addEventListener('click', async()=>{
    console.log("entro");
    let  lgt= await carXml('get', '/sair', null);
    window.location.href=lgt;
});