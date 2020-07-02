const request=require('request');
const forecast = (address,callback) => {
const url="http://api.weatherstack.com/current?access_key=72be9724f1d86acbd9d638bf6242291b&query="+address;
 request({url, json:true},(error,{success,body})=>{
    // const data=JSON.parse(response.body);
        if(error){
            callback("could not connect to api",undefined);
        }else if(success===false){
            callback("Query issue",undefined)
        }else{
            callback(undefined,{
                        currentemp:body.current.temperature,
                        feelslike:body.current.feelslike
            })
        }
 })
}
module.exports = forecast