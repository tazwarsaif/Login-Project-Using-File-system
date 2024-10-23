const { fileLoader } = require('ejs');
const fs = require('fs');
const path = require('path');
const users = [];
const p = path.join(path.dirname(require.main.filename),'data','users.json');


const getAllIds = cb => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([])
        }
        return cb(JSON.parse(fileContent));
    })
}

module.exports = class User {
    constructor(name,username,password){
        this.name = name;
        this.username = username;
        this.password = password;
    }

    save(username,cb){
        getAllIds(ids=>{
            let flag=true;
            for(let i=0; i<ids.length;i++){
                if(ids[i].username === username){
                    flag = false;   
                    break;
                }
            }
            if(flag===true){
                let users = ids;
                users.push(this);
                fs.writeFile(p,JSON.stringify(users),err=>{
                    console.log(err);
                })
                cb(true);
            }
        else{
            cb(false);
        }
        })
        
    }

    static updateUser(username,name,pass,cb){
        getAllIds((ids)=>{
            const users = [];
            let id;
            for(let i=0; i<ids.length;i++){
                if(ids[i].username === username){
                    ids[i].name = name;
                    ids[i].password = pass;
                    users.push(ids[i]);
                }else{
                    users.push(ids[i]);
                }
            }
            fs.writeFile(p,JSON.stringify(users),err=>{
                console.log(users);
            })
            cb(users);
        })
    }

    static findbyID (username,cb){
        getAllIds((ids)=>{
            let id;
            for(let i=0; i<ids.length;i++){
                if(ids[i].username === username){
                    id=ids[i];
                }
            }
            cb(id);
        })
    }

    static deleteUser (username,cb){
        getAllIds((ids)=>{
            const users = [];
            for(let i=0; i<ids.length;i++){
                console.log(ids[i].username,i,username);
                if(ids[i].username === username){
                    continue;
                }else{
                    users.push(ids[i]);
                }
            }
            fs.writeFile(p,JSON.stringify(users),(err)=>{
                console.log(err);
            })
            cb(username);
        })
    }

    static login(username_given,password_given,cb){
        getAllIds((ids)=>{
            let id;
            for(let i=0; i<ids.length;i++){
                if(ids[i].username === username_given && ids[i].password === password_given){
                    id=ids[i];
                }
            }
            console.log(id);
            cb(id);
        })
    }
}

// [{"name":"Saif","username":"tazwarsaif@gmail.com","password":"1234"},{"name":"arisha","username":"tazwarsaif02@gmail.com","password":"1234"}]