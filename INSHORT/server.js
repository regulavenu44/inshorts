const mongoose = require('mongoose');
const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const dotenv=require('dotenv');
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.render('index');
});
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database is connected');
})
.catch(err => {
    console.error('Database connection error:', err);
});
const newsSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:500
    },
    summary:{
        type:String,
        maxlength:1000
    },
    image_url:{
        type:String,
        maxlength:1000
    },
    published:{
        type:Date
    }
});
const news=mongoose.model('news2',newsSchema);
app.get('/news',async (req,res)=>{
    try{
    const newsData=await news.find();
    if(!newsData){
        res.status(404).json({status:false});
    }
    else{
        res.status(200).json({status:true,data:newsData});
    }
    }
    catch(err){
        console.error('Error fetching news:', err);
        res.status(500).json({status:err.message});
    }
});
app.listen(3001,()=>{
    console.log("server is running....");
});