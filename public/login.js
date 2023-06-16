
var form=document.querySelector('#myform');
form.addEventListener('submit',login);
function login(e){
    e.preventDefault();
    console.log(e.target.name);
    const loginDetails={
        email:e.target.email.value,
       password:e.target.password.value,

    }
    console.log(loginDetails)
 axios.post('18.234.97.190:4500/user/login',loginDetails).then(response=>{
    console.log(response.data)
    if(response.status === 200){
        localStorage.setItem('token', response.data.token);
    
       console.log(response.data.token)
        window.location.href = "./expensetracker.html"; // change the page on successful login
        alert(response.data.message)
    } else {
        throw new Error('Failed to login')
    }



}).catch(err=>{
    console.log(JSON.stringify(err))
    document.body.innerHTML+=`<div style="color:red">${err.message}<div>`;
})
}
function forgotpassword() {
    window.location.href = "./Forgotpassword.html"
}