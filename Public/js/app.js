const weatherForm=document.querySelector('form');
const inputText=document.querySelector('input');
const messageOne=document.querySelector('#msg_1');
const messageTwo=document.querySelector('#msg_2');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
     const searchText=inputText.value;
     const baseUrl="http://localhost:3000/weather?address="+searchText;
     fetch(baseUrl).then((resp)=>{
         resp.json().then((weatherData)=>{
             if(weatherData.error){
                 messageTwo.textContent=weatherData.error;
             }else{
                messageOne.textContent="Temperatur is " + weatherData.Data.temp+"digree, it feelsike"+weatherData.Data.feelslike+"digree and ther is "+weatherData.Data.rainChances+"% rainChance" ;
                messageTwo.textContent=weatherData.Location
             }
         })
     })
})