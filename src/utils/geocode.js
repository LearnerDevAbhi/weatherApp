
const request=require('request');
const geoCode=(address,callback)=>{
    var geoUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWJoaTMyMSIsImEiOiJja2Z2YmhyOG0xMTJsMzJscjkzMnBtcHN0In0.Dvjeu_WwM8hQ1Ss4hm3A9Q"
    request({url:geoUrl,json:true},(err,res)=>{
      const { features } =res.body;
      if(err){
        callback('check your internet',undefined)
      }else if(res.body.features.length===0){
        callback('unable to find loaction',undefined)
      } else{
             
             callback(undefined,{
               lat:features[0].center[1],
               long:features[0].center[0],
               location:features[0].place_name
             })
    
      }
    })
    }
    module.exports=geoCode