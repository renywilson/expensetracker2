

  // var arr = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
  // var cont = document.getElementById('container');
  
  // // create ul element and set the attributes.
  // var ul = document.createElement('ul');
  
  // ul.setAttribute('id', 'theList');
  
  // for (i = 0; i <= arr.length - 1; i++) {
  //     var li = document.createElement('li');     // create li element.
  //     li.innerHTML = arr[i];      // assigning text to li using array value.
  //     li.setAttribute('style', 'display: block;');    // remove the bullets.
  
  //     ul.appendChild(li);     // append li to ul.
  // }
  
  // cont.appendChild(ul);    // append li to ul.
 
  
  // cont.appendChild(ul);   
  



var Sib=require('sib-api-v3-sdk')
require('dotenv').config();
var client=Sib.ApiClient.instance
var apiKey=client.authentications['api-key']
apiKey. apiKey='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'
const transEmailApi=new Sib.TransactionalEmailsApi()

  const Sender={
    email:'Sender Email'
}
const receiver=[{
    email:'receiver email '

}]

transEmailApi.sendTransacEmail( {
    Sender, // Change to your recipient
    to: receiver, // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    textContent: 'and easy to do anywhere, even with Node.js',
    //html: `<a href="18.234.97.190:4500/password/resetpassword/${id}">Reset password</a>`,
}).then(console.log)
.catch(console.log)
// //    const Sender={  
        //     email:'alwinwilsonalukkal@gmail.com'
        // }
        // const receiver=[{
        //     email:'renywilson@gmail.com '
        
        // }]
        
        // transEmailApi.sendTransacEmail( {
        //     Sender, // Change to your recipient
        //     to: receiver, // Change to your verified sender
        //     subject: 'Reset Password',
        //     textContent: 'Reset password by clicking below Link.........',
        //     html: `<a href="18.234.97.190:4500/password/resetpassword/${id}">Reset password</a>`,
        // })