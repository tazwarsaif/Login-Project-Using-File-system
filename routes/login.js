const express = require('express');
const path = require('path');
const User = require('../mdoels/ids');
const { readdir } = require('fs');

const router = express.Router();



router.get('/',(req,res,next)=>{
    res.render(`login`,{loginFlag:true});
})

router.post('/register',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const user = new User(name,username,password);
    user.save(username,(flag)=>{
        if(flag===false){
            res.render('register');
        }else{
            res.redirect('/');
        }
    });
})

router.get('/login',(req,res,next)=>{
    res.render('login',{message:'Wrong Credentials',loginFlag:false});
})

router.get('/register',(req,res,next)=>{
    res.render('register');
})

router.get('/dashboard/:username',(req,res,next)=>{
    const username = req.params.username;
    User.findbyID(username,(id)=>{
        res.render('dashboard',{name:id.name,username:id.username});
    });
});

router.post('/login',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.login(username,password,(id)=>{
        if(!id){
            res.render('login',{message:'Wrong Credentials',loginFlag:false});
        }else{
            res.redirect(`dashboard/${id.username}`);
            // res.render(`dashboard`,{name:id.name,loginFlag:true});
        }
    });
})

router.post('/delete',(req,res,next)=>{
    const username = req.body.username;
    User.deleteUser(username,(id)=>{
        console.log(id,username);
        res.redirect('/');
    })
})

router.post('/logout',(req,res,next)=>{
    res.redirect('/');
});

router.get('/edit/:username',(req,res,next)=>{
    const username = req.params.username;
    User.findbyID(username,(id)=>{
        res.render('edit',{name:id.name,username:id.username,password:id.password});
    });
})

router.post('/edit',(req,res,next)=>{
    console.log(req.body.username);
    const username = req.body.username;
    User.findbyID(username,(id)=>{
        console.log(username);
        res.redirect(`edit/${id.username}`);
    });
})

router.post('/dashboard/:username',(req,res,next)=>{
    const username = req.params.username;
    const name = req.body.name;
    const password = req.body.password;
    User.updateUser(username,name,password,(users)=>{
        console.log(users);
    });
    res.redirect(`/dashboard/${username}`);
})

module.exports = {router};