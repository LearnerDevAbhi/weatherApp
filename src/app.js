const path=require('path')
const express=require('express');
const hbs =require('hbs');
const app=express();
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
const { error } = require('console');
const publicDir=path.join(__dirname,'../Public');
const viewPath=path.join(__dirname,'../template/views');
const partialPath=path.join(__dirname,'../template/partials')
app.use(express.static(publicDir))

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        Author:"Abhishek Tiwari"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        Author:"Abhishek Tiwari"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        Author:"Abhishek Tiwari"
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Not found',
        Author:'Tiwari'

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
        
    }
geocode(req.query.address,(errorP,{lat,long,location}={})=>{
    if(errorP) {
        return res.send(errorP)
    }
    forecast(lat,long,(err,forecastData)=>{
        if(err){
            return res.send(err)
        }
        res.send({
            Data:forecastData,
            Location:location,
            Addresss:req.query.address

        })
    })
      
})
   
})     

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 ',
        Author:'Tiwari'
       })})


 
app.listen(3000,()=>[
    console.log('server is up on port 3000')
])