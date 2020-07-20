import express from 'express';
import { geocode}  from './utils/geocode.js';
import  {foreCast} from './utils/forecast.js';
import path from 'path';
import hbs from 'hbs';
const app = express();

const __dirname = path.resolve();
const publicPAthDirectory = path.join(__dirname,'/public');
const viewPath = path.join(__dirname,'/templates/views')
const partialPath =  path.join(__dirname,'/templates/partials')

hbs.registerPartials(partialPath);
app.set('view engine', 'hbs');
app.set('views',viewPath);


app.use(express.static(publicPAthDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'whether app description',
    })
})
app.get('/help',(req,res)=>{
    res.send('Help');
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'about'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send("please provide address")
    }

    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            //return res.send(error)
        }

        foreCast(latitude, longitude, (error, forecastData) => {
            if (error) {
               // return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address:req.query.address
            })
        })
    })
       
    
  
})

app.get('*',(req,res) => {
    res.send('404')
})

app.listen(3000,()=>{
    console.log('server is up on port')
});