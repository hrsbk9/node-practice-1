console.log("client side app.js");

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const resultMessage = document.querySelector('#result')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    errorMessage.textContent ='';
    resultMessage.textContent ='';
    const location=searchTerm.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error
            }
            else{
                 resultMessage.textContent = 'The current temperature is '+data.result.currentemp+' degrees but it feelslike '+data.result.feelslike+' @ '+data.location;
            }
        })
    })

})

