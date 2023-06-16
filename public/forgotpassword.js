function forgotpassword(e) {
    e.preventDefault();
 const value= e.target.email.value
  

    const userDetails = {
        email: value

    }
    console.log(userDetails)
    const token=localStorage.getItem('token')
  axios.post('18.234.97.190:4500/password/forgotpassword',userDetails,{headers:{"Authorization":token}}).then(response => {
console.log(response.status)
        if(response.status === 202){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}