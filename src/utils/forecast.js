import  request from 'postman-request'
export const foreCast=(latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/forecast?access_key=d4997e772e921f6a441229a6c6ecaf40&query=${latitude},${longitude}`

    request({url,json:true},(error, {body})=>{
        if(error){
            callback("unable to forcasr",undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            console.log(body)
            callback(undefined,  ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
        }
    }) 
    
}