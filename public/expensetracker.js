



function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
function showPremeiumusereMessage()
{
  document.getElementById('rzp-button1').style.visibility="hidden"
  document.getElementById('message').innerHTML="You are premium user now";
}
function showprebutton()
{
  const inputElement=document.createElement('button')
  inputElement.innerText = "Show Leaderboard";
  inputElement.value="showLeaderBoard"
  inputElement.style.width = "150px"; // Set the desired width
inputElement.style.height = "25px";
  inputElement.setAttribute('id','showbutton')
  document.getElementById('message').appendChild(inputElement)
  inputElement.onclick=async()=>{
    const token=localStorage.getItem('token')
  
  const userleaderboardArray= await axios.get('18.234.97.190:4500/premium/showLeaderBoard',{headers:{"Authorization":token}})
  console.log(userleaderboardArray);
  var cont = document.getElementById('container');
  
  // create ul element and set the attributes.
  var ul = document.createElement('ul');
  
  ul.setAttribute('id', 'theList');
  var liHeading = document.createElement('li'); // Create a new <li> element for the headings
liHeading.textContent = 'Name  |   Total cost'; // Set the text content of the <li> element for the headings
ul.appendChild(liHeading); // Add the <li> element for the headings to the <ul> element

  for (i = 0; i <= userleaderboardArray.data.data.length - 1; i++) {
      var li = document.createElement('li');     // create li element.
      li.textContent = userleaderboardArray.data.data[i].name+'   |   '+userleaderboardArray.data.data[i].totalExpences;  
     
      console.log(userleaderboardArray.data.data[i])   // assigning text to li using array value.
      li.setAttribute('style', 'display: block;');    // remove the bullets.
  
      ul.appendChild(li);     // append li to ul.
  }
  
  cont.appendChild(ul);    // append li to ul.
  }
    
}

document.addEventListener("DOMContentLoaded",(event) =>{
 const token=localStorage.getItem('token')
 console.log(token)
 const decodeToken=parseJwt(token);
 console.log(decodeToken);
 //const ispremiumuser=localStorage.getItem('ispremiumuser')
 //console.log(ispremiumuser)
 const isadmin=decodeToken.ispremiumuser
 console.log(isadmin)

 const perPage = 5;
 const page=1
 // Assuming you have a dropdown element with id "pageSizeDropdown"


 if(isadmin)
 {
   showPremeiumusereMessage();
  showprebutton();
 }
 
    axios.get(`18.234.97.190:4500/expense/getexpenses?page=${page}`,{headers:{"Authorization":token}})
    .then(res =>{ //console.log(res.data)
   
      var fragment = document.createDocumentFragment(); // Create a fragment to hold the items

      for (var i = 0; i < res.data.expenses.length; i++) {
        var li = createElement(res.data.expenses[i]);
        fragment.appendChild(li); // Append each item to the fragment
      }
  showPagination(res.data.pageData)
      var list = document.getElementById("expenseList");
      list.innerHTML = ""; // Clear the list before adding new items
      list.appendChild(fragment); // Append the fragment with all the items
  
   } )
    .catch(err =>console.log(err))
})


function onsubmit(e) {
  e.preventDefault();

  // Capture the selected value
  const perPage = e.target.perPageInput.value;

  // Store the value in local storage
  localStorage.setItem('perPage', perPage);

 
}
var form=document.querySelector('#myform');
var list=document.querySelector('.expense_details');

form.addEventListener('submit',onsubmit);
function onsubmit(e){
    e.preventDefault();
    const expenseamount=e.target.expenseamt.value;
    const description=e.target.descript.value;
    const category=e.target.categories.value;
    
    const obj={
        expenseamount,
        description,
        category,
       
    }
    console.log(obj);
    const token=localStorage.getItem('token')
    axios.post("18.234.97.190:4500/expense/addexpense",obj,{headers:{"Authorization":token}})
    .then((res) =>{
      console.log(res.data);
     
        createElement(res.data.expense);
    
  
      })
        .catch((err) =>{
          alert("something went wrong")
            console.log(err)})
       
}
function createElement(objun, currentPage, itemsPerPage) {
  var li = document.createElement("li");
  li.className = "expensedetails";
  li.appendChild(document.createTextNode(`  ${objun.expenseamount}  `));
  li.appendChild(document.createTextNode(`  ${objun.description}  `));
  li.appendChild(document.createTextNode(`  ${objun.category}  `));

  var editbutton = document.createElement("button");
  editbutton.className = "btnedit";
  editbutton.style.backgroundColor = "green";
  editbutton.appendChild(document.createTextNode("Edit Expense"));
  li.appendChild(editbutton);

  editbutton.addEventListener("click", () => {
    document.getElementById("expenseamt").value = objun.expenseamount;
    document.getElementById("descript").value = objun.description;
    document.getElementById("categories").value = objun.category;
    console.log(objun);

    li.remove();
  });

  var deletebutton = document.createElement("button");
  deletebutton.className = "btndelete";
  deletebutton.style.backgroundColor = "red";
  deletebutton.appendChild(
    document.createTextNode("Delete Expense")
  );
  li.appendChild(deletebutton);
  deletebutton.addEventListener("click", () => {
     const token=localStorage.getItem('token')
   
       axios
        .delete(`18.234.97.190:4500/expense/deleteexpense/${objun.id}`,{headers:{"Authorization":token}})
        .then((res) =>
        console.log(res.data),
         li.remove(),
         alert("One Record Deleted")
         )
        .catch((err) => {
          alert("Something went wrong");
          console.log(err);
        });
    
  });

  var startIndex = (currentPage - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var list = document.getElementById("expenseList");
  list.innerHTML = "";
  if (startIndex <= list.children.length && endIndex <= list.children.length) {
    for (var i = startIndex; i < endIndex; i++) {
      if (list.children[i]) {
        list.removeChild(list.children[i]);
      }
    }
  }
  list.appendChild(li);

  document.getElementById("expenseamt").value = "";
  document.getElementById("descript").value = "";
  document.getElementById("categories").value = "";
  return li;
}
function showPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage}) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (hasPreviousPage) {
    const btnPrevious = document.createElement("button");
    btnPrevious.innerHTML = previousPage;
    btnPrevious.addEventListener("click", () => getExpenses(previousPage));
    pagination.appendChild(btnPrevious);
  }

  const btnCurrent = document.createElement("button");
  btnCurrent.innerHTML = currentPage;
  btnCurrent.addEventListener("click", () => getExpenses(currentPage));
  pagination.appendChild(btnCurrent);

  if (hasNextPage) {
    const btnNext = document.createElement("button");
    btnNext.innerHTML = nextPage;
    btnNext.addEventListener("click", () => getExpenses(nextPage));
    pagination.appendChild(btnNext);
  }
  
}
const dropdown = document.getElementById('dropdown');
dropdown.addEventListener('change', (event) => {
  
  const selectedPageSize = event.target.value
  console.log(selectedPageSize)
  localStorage.setItem('selectedPageSize',selectedPageSize)
  const token = localStorage.getItem('token');
  const url = `18.234.97.190:4500/expense/getexpenses?pageSize=${selectedPageSize}`;
  
  // Make the API call with the updated URL
  axios.get(url, { headers: { "Authorization": token } })
    .then(res => {
      // Process the response
      console.log(res.data);
      var fragment = document.createDocumentFragment(); // Create a fragment to hold the items

      for (var i = 0; i < res.data.expenses.length; i++) {
        var li = createElement(res.data.expenses[i]);
        fragment.appendChild(li); // Append each item to the fragment
      }
  showPagination(res.data.pageData)
      var list = document.getElementById("expenseList");
      list.innerHTML = ""; // Clear the list before adding new items
      list.appendChild(fragment);
    })
    .catch(err => {
      // Handle errors
      console.log(err);
    });
});

function getExpenses(page) {
  // Logic to retrieve expenses for the specified page
  // Make an API call or perform any necessary operations
  const token=localStorage.getItem('token')
  console.log("Requested page:", page);
  // Example: Console log the page value
  const selectedPageSize=localStorage.getItem('selectedPageSize')
  console.log(selectedPageSize)
  axios.get(`18.234.97.190:4500/expense/getexpenses?page=${page}&pageSize=${selectedPageSize} `,{headers:{"Authorization":token}})
  .then(res =>{ 
   
    var fragment = document.createDocumentFragment(); // Create a fragment to hold the items

    for (var i = 0; i < res.data.expenses.length; i++) {
      var li = createElement(res.data.expenses[i]);
      fragment.appendChild(li); // Append each item to the fragment
    }
showPagination(res.data.pageData)
    var list = document.getElementById("expenseList");
    list.innerHTML = ""; // Clear the list before adding new items
    list.appendChild(fragment); // Append the fragment with all the items

 
    
   } )
  .catch(err =>console.log(err))
}


document.getElementById('rzp-button1').onclick=async function(e){
  const token=localStorage.getItem('token')
  

 const response= await axios.get('18.234.97.190:4500/purchase/premiummembership',{headers:{"Authorization":token}});
  console.log(response);
   var options=
   {
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler":async function(response){
    const res= await axios.post('18.234.97.190:4500/purchase/updatetransactionstatus',{order_id:options.order_id,payment_id:response.razorpay_payment_id,}, {headers:{"Authorization":token}});
  
    alert('you are premium user now');
    localStorage.setItem('token',res.data.token)
    //localStorage.setItem(' ispremiumuser',true)
    document.getElementById('rzp-button1').style.visibility="hidden"
    document.getElementById('message').innerHTML="You are premium user now";
    },
    
  
  
 
};
const rzp1=new Razorpay(options);
rzp1.open();
e.preventDefault();
rzp1.on('payment.failed',function(response){
  console.log(response);
  alert('something went wrong')
});
}
const toggleButton = document.getElementById('toggleButton');
const downloadUrlsContainer = document.getElementById('downloadUrlsContainer');

toggleButton.addEventListener('click', async () => {
  if (downloadUrlsContainer.style.display === 'none') {
    downloadUrlsContainer.style.display = 'block';
    try {
      const token=localStorage.getItem('token')
  

 const response= await axios.get('18.234.97.190:4500/expense/downloadfile',{headers:{"Authorization":token}});
      // Assuming the response JSON contains a `downloadUrls` array
      console.log(response)
      const downloadUrls =response. data.fileUrls;

      // Clear existing URLs
      downloadUrlsContainer.innerHTML = '';

      // Iterate over the downloadUrls array and display the URLs
      downloadUrls.forEach((url) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.textContent = url;
        downloadUrlsContainer.appendChild(link);
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    downloadUrlsContainer.style.display = 'none';
  }
});

function download(){
  const token=localStorage.getItem('token')
  axios.get('18.234.97.190:4500/expense/download', { headers: {"Authorization" : token} })
  .then((response) => {
    console.log("Download response is",response)
      if(response.status === 200){
        console.log(response.data.fileUrl)
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          var a = document.createElement("a");
          a.href = response.data.fileUrl;
          a.download = 'myexpense.csv';
          a.click();
      } else {
         throw new Error(response.data.message)
      }

  })
  .catch((err) => {
    console.log(err)
      
  });
}
