const express = require('express');
const app = express();
const axios = require('axios');
const cors = require("cors");
// const firebase = require("firebase/");
// import { initializeApp } from "firebase/app";
const admin=require('firebase-admin');

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

var serviceAccount = require('./admin.json');
const { json } = require('express');
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://delivery-made-easy-default-rtdb.firebaseio.com",
authDomain: "delivery-made-easy.firebaseapp.com",
});

var db=admin.database();
var userRef=db.ref("users");

function addUser(obj){
    var oneUser=userRef.child(obj.roll);
    oneUser.update(obj,(err)=>{
    if(err){
        console.log("Error")
        return "Error"
    }
    else{
        console.log("Success");
        return "Success"
    }
    }) 
}


const firebaseConfig = {
    apiKey: "AIzaSyACpZdE4Ff2XLZg2TlkCJwQkq-rSDk_jFA",
    authDomain: "delivery-made-easy.firebaseapp.com",
    projectId: "delivery-made-easy",
    storageBucket: "delivery-made-easy.appspot.com",
    messagingSenderId: "528491488333",
    appId: "1:528491488333:web:27c5eb956af9ef80456804",
    measurementId: "G-F89RMJDFVW"
};

// firebase.initializeApp(firebaseConfig);

// let database = firebase.database()



app.get('/',(req,res)=>{
    console.log("request received..")
    let status = addUser({'roll':"3","Name":"prajwal"},res)
    if (status == 'Error'){
        res.status(300).json({"msg":"There has been an error"})
    }
    else{
        userRef.once('value',function(snap){
            res.status(200).json(snap.val())
        })
        
    }
})

app.listen(5000,()=>{console.log("Listening on port 5000 ...")});
