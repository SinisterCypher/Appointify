
function refreshAfterSubmission (){
    window.location.href = '/';
}

function clearForm(form) {
console.log("clearing form....");
    const fields = ['firstname', 'lastname', 'email', 'rec_email', 'message'];
    for (let field of fields) {
        console.log("inside clearing loop")
        form[field].value = ''
    }
    document.querySelector('#userSelection').innerText = '';

    setTimeout(refreshAfterSubmission,6000); 


}

export default clearForm;



