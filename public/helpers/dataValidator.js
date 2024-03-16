
const form = document.querySelector('form');  // Targeting form element in DOM 


form.addEventListener('submit', (event) => { // Event listener when user clicks submit button 
    event.preventDefault();
    console.log(event);
    // Extract all the data from fields 
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const from = document.getElementById('email').value // sender email
    const to = document.getElementById('rec_email').value // receiver email
    const message = document.getElementById('message').value;
    const appointmentDate = document.getElementById('userSelection').innerHTML;
    const errMsg = document.getElementById('errMsg')

    const data = { firstname, lastname, from, to, message }


    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }
    if (appointmentDate) {
        if(errMsg.innerText) {
            errMsg.innerText = ""
        }

        const sendData = async () => {
            try {
                const response = await fetch('/submit', options)
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.message);
                    errMsg.style.color= 'green'
                    errMsg.innerText = data.message;
                }
   
            }


            catch (error) {
                errMsg.innerHTML = error.message; 
            }


        }   
        sendData();
        


    }
    else {
        errMsg.innerText = "Please Select a Appointment date!!"
        return
    }
})