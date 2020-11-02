    const request=require('request');
    const forecast =(lat,long,callback)=>{
    const foreURL="http://api.weatherstack.com/current?access_key=657b42e53976b3d737c8d9c60407620b&query="+lat+","+long;
    request({url:foreURL,json:true},(err,res)=>{
        const {temperature,precip,feelslike,humidity}=res.body.current;
        if(err){
            callback('check your internet connection',undefined)
        }else if(res.body.error){
            callback('provide query parameter please',undefined)
        }
        else{
            callback(undefined,{
                temp:temperature,
            rainChances:precip,
            feelslike:feelslike,
            humid:humidity
            })
        }
    })
    }
    module.exports=forecast