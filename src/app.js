const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode= require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

// Path setup for public and view folders
const publicFolderPath = path.join(__dirname,"../public")
const viewsFolderPath = path.join(__dirname, "../templates/views")
const partialsFolderPath = path.join(__dirname, "../templates/partials")

// express usage
const app = express()

//Handle bars usage
app.set('view engine','hbs');
app.set('views', viewsFolderPath);
hbs.registerPartials(partialsFolderPath);

app.use(express.static(publicFolderPath));

app.get('',(req, res)=>{
    res.render('index', {
        title:'Welcome page',
        name:'Harsha'
    })

})
app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About page',
        name:'Harsha'
    })

})
app.get('/help',(req, res)=>{
    res.render('help', {
        title:'Help page',
        name:'Harsha'
    })

})
 
app.get('/weather',(req, res) => {
     
    if(!req.query.address){
       return res.send({
            error:"Provide Address"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
        return res.send({
                error
            })
        }
        forecast(latitude+','+longitude,(err, result)=>{
            if(err){
                return res.send({
                        err
                    })
                }
                res.send({
                    result,
                    location
                })

        })

    })
    

 })

 app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:"404 error",
        msg:"Help article not found",
        name:'Harsha'
    })

})
app.get('*',(req, res)=>{
    res.render('404', {
        title:"404 error",
       msg:"Page not found",
       name:'Harsha'
    })

})
app.listen(3000,()=>{
console.log("Server started at port 3000");
})