const banco = require('./app/model/banco'),
    cadSave= require('./app/model/cadSave'),
    confLog=require('./app/model/confLogin'),
    gtk=require('./app/model/gerToken');

let express = require('express'),
    http=require('http'),
    path=require('path'),
    app=express(),
    cookieParser=require('cookie-parser'),
    session= require('express-session');
    

    app.set('view engine','hbs');
    app.set('views', path.join(__dirname, '/app/views'));
    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.json());
    app.use(session({
        secret: gtk.token(16),
        resave: false,
        saveUninitialized: true
    }));

    app.get('/',(req,res)=>{
        if(req.session && req.session.login)
            res.render('busca');
        else
            res.render('login');
    });
    app.get('/cad',(req,res)=>{
        res.render('cadastro');
    });
    app.post('/cad', async (req,res)=>{
        let email= req.body.email,
            usuario= req.body.usuario,
            senha= req.body.senha,
            resp= await cadSave.confBanco(email, usuario, senha);
            res.send(resp);
    });
    app.get('/login', (req,res)=>{
        /*if(req.session && req.session.login)
            res.render('busca');
        else
            res.render('login');*/
    });
    app.post('/login', async(req,res)=>{
        let remail=req.body.email,
            rsenha=req.body.password,
            resp= await confLog.comp(remail,rsenha);
            if(resp=='200')
                req.session.login=remail;
        res.send(resp);
    });
    app.get('/busca',(req,res)=>{
        res.render('busca');
    });
    app.get('/sair', (req,res)=>{
        req.session.destroy();
        res.status(200).send('http://localhost:3000');
    });

    app.listen(3000);