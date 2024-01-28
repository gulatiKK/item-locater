var currentItem = "";
let ConName = "";
let User = "not set";
var servername = ""

// Set the top navigation bar according to user
const setNavBar = () => {
  let ul = document.getElementById("navBar")
  if(localStorage.getItem('User') != null)
  {
    ul.innerHTML = `<li style="color: grey;""><a>Logged in as: ${localStorage.getItem('User')}</a></li>
    <li class="home"><a onclick="setLogOut()">Log Out</a></li>
    `
  }
  else
  {
    ul.innerHTML = `<li class="home"><a onclick="setLog()">Log In</a></li>
    <li class="home"><a onclick="onSignModal()">Sign Up</a></li>
    `
  }
}

//----- Add Item Start -----
const onPostSubmit = () => {
  if(localStorage.getItem('User') != null)
  {
  let username = localStorage.getItem('User');
  let status = "public";
  if(document.getElementById('postToggle').checked)
      {
        status = "private"
      }
    console.log(document.getElementById('postName').value);
    console.log(document.getElementById('postDiscription').value);
    console.log(document.getElementById('postType').value);
    let name = document.getElementById('postName').value;
    let discription = document.getElementById('postDiscription').value;
    let type = document.getElementById('postType').value;
    
    
      // Create an object with the updated data
      const data = {
        name: name,
        discription: discription,
        type: type, 
        username: username,
        status: status
      };
    
    
      let xhr = new XMLHttpRequest();
      xhr.open("POST", servername + "/api/item");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
    
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          // Call the loadbooks function here if the update was successful
        }
      };
      xhr.send(JSON.stringify(data));
      
      document.getElementById('addWindow').style.display = "none";
      document.getElementById('listWindow').style.display = "block";
      location.reload();
    }
    else
    {
      alert("You must login first to add items")
    }
    }
//----- Add Item Finish -----

//----- Edit Item Start -----
const onEditSubmit = () => {
  console.log(currentItem);
  console.log(document.getElementById('edt_name').value);
  console.log(document.getElementById('edt_discription').value);
  console.log(document.getElementById('edt_type').value);


  let name = document.getElementById('edt_name').value;
  let discription = document.getElementById('edt_discription').value;
  let type = document.getElementById('edt_type').value;

  // Create an object with the updated data
  const data = {
    name: name,
    discription: discription,
    type: type
  };


  let xhr = new XMLHttpRequest();
  xhr.open("POST", servername+"/api/update/" + currentItem);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      // Call the loadbooks function here if the update was successful
    }
  };

  xhr.send(JSON.stringify(data));
  console.log(data);

  document.getElementById('editWindow').style.display = "none";
  document.getElementById('listWindow').style.display = "block";
  location.reload();
};
//----- Edit Item Finish -----

//----- Delete Item Start -----
const deleteBook = (id) => {
  for (let book of books)
  {
    if(book._id == id)
    {
      if(book.username == localStorage.getItem('User'))
      {
        const xhttp = new XMLHttpRequest();

        xhttp.open("DELETE", servername+`/api/delete/${id}`, false);
        xhttp.send();
    
        // Reloading the page
        location.reload();
      }
      else
      {
        alert("Wrong User")
        location.reload();
      }
    }
  }
    
}
//----- Delete Item Finish -----


// Load Books
let books = []; // Declare the books array
const loadBooks = () => {
  if(localStorage.getItem('User') != null)
  {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", servername +"/api/getAll", false);
    xhttp.send();

    books = JSON.parse(xhttp.responseText); // Store the books in the 'books' array

    displayBooks(books); // Call the displayBooks function with the retrieved books data
  }
}

//---- Search Bar Start ----
const filterBooks = (searchTerm) => {
    const filteredBooks = books.filter(book => {
        return book.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    displayBooks(filteredBooks);
}

const handleSearch = () => {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    filterBooks(searchTerm);
}

// Add event listener for search button
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearch);
});
//---- Search Bar finish ----

// Set container icon
const disp_getIcon = (item_type) => {
  icon_type = ``
    if (item_type == 'container')
  {
    icon_type = `<i class="bi bi-box-seam"></i>`
  } 
  return (icon_type)
}

// Get container
const disp_getContainer = (item_name) => {
  let container_name = "not set";
  for ( let rel of relations)
  {
          if ( item_name == rel.item_name)
          {
              container_name = rel.container_name;
          }
  }
  return(container_name)

}

//----- List Display Start -----
let toggle = [];
const displayBooks = (books) => {
    let toggleNum = ""
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    
    console.log(testvar);
    for (let book of books) {
      toggleNum=book.name;
      toggle.push(toggleNum);
      // document.getElementById(toggleNum).checked = true;
      let container_name = disp_getContainer(book.name)
      icon_type = disp_getIcon(book.type)
      // let item = send_tileInfo(book.name)
      // console.log(item)
      //let related_objects = disp_related_objects(book.name)
      // col-xs-12
      const x = `
          <div class="col-12 col-md-4">
              <div class="card">
                  <div class="card-body">
                      <h3 onclick="tileInfo('${book._id}');loadObjectsInSelectBox('${book._id}');" type="button" class="card-title" style="text-transform: capitalize;"><b>${icon_type} ${book.name}</b></h3>
                      <h6 class="card-title"></h6>
                      <h7 style="
                      display:inline-block;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-width: 23ch;" class="card-subtitle mb-2 text-muted">${book.discription}</h6>&nbsp;
                      &nbsp;
                      <h6 class="card-subtitle mb-2 text-muted"><b>Conatiner: ${container_name}</b></h6>
                      <h6 class="card-subtitle mb-2 text-muted"><b>Private:</b></h6>
                      <label class="switch">
                      <input id="${toggleNum}" onclick="setStatus('${book._id}', '${toggleNum}')" type="checkbox">
                      <span class="slider round"></span>
                      </label>
                    
                      <hr>
                      <div class="btn-group" role="group">
                          <button type="button" style="font-size: 18px" class="btn btn-danger btn btn-success btn-lg" onClick="deleteBook('${book._id}')"><i class="bi bi-trash"></i> </button>&nbsp;
                          <button type="button" style="font-size: 18px" class="btn btn-primary btn-lg" onClick="setEditModal('${book._id}')"> <i class="bi bi-pencil-square"></i> </button>&nbsp;
                      </div>
                  </div>
              </div>
          </div>
      `;
      if(book.status == "public"){
        booksContainer.innerHTML += x;
      }
        else if(book.username == localStorage.getItem('User'))
        {
            booksContainer.innerHTML += x;
        }
    }
}
//----- List Display Finish -----

// Load all Login user and password
let logs = [];
const loadLogs = () => {
const xhttp = new XMLHttpRequest();

xhttp.open("GET", servername +"/api/allLog", false);
xhttp.send();

logs = JSON.parse(xhttp.responseText); // Store the books in the 'books' array
for (let log of logs) {
  // ...
}
}

// Show status on toggle
const setToggle = () => {
  for(let tog of toggle){
    for(let book of books){
      if(tog == book.name){
      if(book.status == "private")
      {
        if(book.username != null && book.username == localStorage.getItem('User')){
        document.getElementById(tog).checked = true;
        }
      }
      else
      {

      }
    }
    }
  }
}

// Set extra displays to "none"
document.getElementById('editWindow').style.display = "none";
document.getElementById('addWindow').style.display = "none";
document.getElementById('tileInfo').style.display = "none";
document.getElementById('logWindow').style.display = "none";
document.getElementById('signWindow').style.display = "none";

// Load all requirements
loadRelations();
loadBooks();
loadLogs();
loadContainersInSelectBox();
setToggle();
setNavBar()

// Add event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);
const setPage = () => {
  location.reload();
}
