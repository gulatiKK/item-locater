var currentItem = "";
let ConName = "";
let User = "not set";
var servername = "http://192.168.1.126:3000"

function backToItemlist(){
  location.reload();
}
const setLog = () => {
  document.getElementById('logWindow').style.display = "block";
  document.getElementById('listWindow').style.display = "none";
}
const setLogOut = () => {
  localStorage.setItem("None", log.userName);
  alert("Logged Out")
}
const setPostModal = () => {
    document.getElementById('addWindow').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
}

const setRelationModal = () => {
    document.getElementById('relationWindow').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
}

const setTileModal = () => {
  document.getElementById('tileInfo').style.display = "block";
  document.getElementById('listWindow').style.display = "none";
}
const onlogSubmit = () => {
  console.log(document.getElementById('userName').value);
    console.log(document.getElementById('password').value);
    let user = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    for (let log of logs)
    {
      console.log(user)
      if(user == log.userName)
      {
        console.log("hello2")
        if(password == log.password)
        {
          localStorage.clear();
          localStorage.setItem("User", log.userName);
          alert("Logged in as user " + localStorage.getItem('User'));
          location.reload();
        }
        else
        {
          alert("Wrong password or username, please try again");
        }
      }
    }
}
const onPostSubmit = () => {
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
        type: type
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

    const onRelationSubmit = () => {
        console.log(document.getElementById('relationItemName').value);
        console.log(document.getElementById('relationContainerName').value);

        let name = document.getElementById('relationItemName').value;
        let container = document.getElementById('relationContainerName').value;
        
          // Create an object with the updated data
          const data = {
            name: name,
            container: container,
          };
        
        
          let xhr = new XMLHttpRequest();
          xhr.open("POST", servername + "/api/relation");
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
          document.getElementById('relationWindow').style.display = "none";
          document.getElementById('listWindow').style.display = "block";
          location.reload();
        }

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

const setEditModal = (id) => {
  document.getElementById('relation-window').style.display = "none";
    currentItem = id;
    document.getElementById('tileInfo').style.display = "none";
    document.getElementById('editWindow').style.display = "block";
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", servername+`/api/getOne/${id}`, false);
    xhttp.send();
    const book = JSON.parse(xhttp.responseText);
    const {
        name,
        discription,
        type
    } = book;


    //editWindow
    document.getElementById('edt_name').value = name;
    document.getElementById('edt_discription').value = discription;
    document.getElementById('edt_type').value = type;
    document.getElementById('listWindow').style.display = "none";

    // Filling information about the book in the form inside the modal
    //document.getElementById('name').value = name;
    //document.getElementById('discription').value = discription;
    //document.getElementById('type').value = type;

    // Setting up the action url for the book
}

const setEditRelation = (id) => {
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    // everytime you add a new item, you should call an api to get all items and set all Items varaibe
    // everytime to add a new a reation call api to get all relations and set allRelations
    // when you are showing items, get the container value from allRelations and show

    xhttp.open("GET", `http://localhost:3000/api/oneRelation/${id}`, false);
    xhttp.send();

    const relation = JSON.parse(xhttp.responseText);
    
    const {
        item_name,
        container_name
    } = relation;

    // Filling information about the book in the form inside the modal
    document.getElementById('item_name').value = item_name;
    document.getElementById('container_name').value = container_name;

}

const deleteBook = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", servername+`/api/delete/${id}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

let books = []; // Declare the books array

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", servername +"/api/getAll", false);
    xhttp.send();

    books = JSON.parse(xhttp.responseText); // Store the books in the 'books' array

    displayBooks(books); // Call the displayBooks function with the retrieved books data
}
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


let relations = [];
let testvar= "abc";
const loadRelations = () => {
    const xhttp = new XMLHttpRequest();
    testvar = "pqr";

    xhttp.open("GET", servername +"/api/allRelation", false);
    xhttp.send();

    relations = JSON.parse(xhttp.responseText); // Store the books in the 'books' array
    for (let relation of relations) {
        // ...
    }
}

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

const disp_getIcon = (item_type) => {
  icon_type = ``
    if (item_type == 'container')
  {
    icon_type = `<i class="bi bi-box-seam"></i>`
  } 
  return (icon_type)
}

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
const ConTile = (Name) => {
for(let book of books)
{
  if(Name == book.name)
  {
    tileInfo(book._id);
    loadObjectsInSelectBox(book._id);
  }
}
}

const TileModal = () => {
    location.reload();
}

const tileInfo = (id) => {
  document.getElementById('relation-window').style.display = "block";
  document.getElementById('fixedbutton2').style.display = "block";
  document.getElementById('fixedbutton3').style.display = "block";
  document.getElementById('fixedbutton4').style.display = "block";
  
  let container_name = "not set";
  let objects = [];
    currentItem = id;
    document.getElementById('tileInfo').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", servername+`/api/getOne/${id}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);
    const {
        name,
        discription,
        type
    } = book;
    for ( let rel of relations)
    {
        if(name == rel.item_name){
          container_name = rel.container_name; 
        }
        if(name == rel.container_name){
          objects.push(rel.item_name)
          console.log(objects[0])
        }
    }
    document.getElementById('ConName').innerHTML = container_name;  
    document.getElementById('TileName').innerHTML = name;
    document.getElementById('TileDescription').innerHTML = discription;
    const TileBar = document.getElementById('TileBar');
    TileBar.innerHTML='';
    for(rel of relations){
      if(name == rel.container_name)
      {
        for(let book3 of books){
          if(rel.item_name == book3.name){
            const x = `<div class="tile3">
                  <button class="btn btn-link" onClick="tileInfo('${book3._id}');loadObjectsInSelectBox('${book3._id}');" id="sub-tile"name="name" style="text-transform: capitalize; color: antiquewhite;">${rel.item_name}</button>
                  <p style="color: antiquewhite; 
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 17ch;">${book3.discription}</p>
                 </div>`;
                 TileBar.innerHTML += x;
          }
        }
        
      }
      if(name == rel.item_name)
      {
        for(rel2 of relations)
        {
          if(rel.container_name == rel2.container_name)
          {
            if(rel2.item_name != name)
            {
              
              for(let book2 of books){
                if(rel2.item_name == book2.name)
                {
                  const x = `<div class="tile3">
              <button class="btn btn-link" onClick="tileInfo('${book2._id}');loadObjectsInSelectBox('${book2._id}');"id="sub-tile" name="name" style="text-transform: capitalize; color: antiquewhite;">${rel2.item_name}</button>
              <p style="color: antiquewhite;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 17ch;">${book2.discription}</p>
             </div>`;
             TileBar.innerHTML += x;
                }
              }
            }
            
          }
        }
      }
    }
    if(container_name != "not set")
    {
    document.getElementById('ConName').onclick = function() {
      ConTile(container_name);
   };
  }
  document.getElementById('fixedbutton3').onclick = function() {
    for(let book of books)
    {
      if(name == book.name){
        deleteBook(book._id);
      }
    }
 };
 document.getElementById('fixedbutton4').onclick = function() {
  for(let book of books)
  {
    if(name == book.name){
      setEditModal(book._id)
    }
  }
};
}

const displayBooks = (books) => {
  
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';
    
    console.log(testvar);
    for (let book of books) {

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
                      <h6 class="card-subtitle mb-2 text-muted"><b>Restricted:</b></h6>
                      <label class="switch">
                      <input id="restricted" onclick="setUser('${book._id}')" type="checkbox">
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
        booksContainer.innerHTML += x;
    }
}
const setUser = (id) => {
  // if(checkbox.checked){
    const data = {
      username: localStorage.getItem('User')
    };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", servername+"/api/update/" + id);
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
// }
// else
// {
//   const data = {
//     username: "not set"
//   };
// let xhr = new XMLHttpRequest();
// xhr.open("POST", servername+"/api/update/" + id);
// xhr.setRequestHeader("Accept", "application/json");
// xhr.setRequestHeader("Content-Type", "application/json");

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     console.log(xhr.status);
//     console.log(xhr.responseText);
//     // Call the loadbooks function here if the update was successful
//   }
// };

// xhr.send(JSON.stringify(data));
// }
}
function loadContainersInSelectBox() {
  const containerSelector = document.getElementById("container_selector");
  const apiUrl = servername+"/api/getAll?type=container";
  if (apiUrl) {
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              for (let i = 0; i < data.length; i++) {
                  const opt = document.createElement("option");
                  opt.value = data[i].name;
                  opt.innerHTML = data[i].name;
                  containerSelector.appendChild(opt);
              }
              containerSelector.addEventListener("change", function() {
                  const index = containerSelector.selectedIndex;
                  const containerInfo = document.getElementById("container_info");
                  containerInfo.innerHTML = `
                      <p>Name: ${data[index].name}</p>
                      <p>Description: ${data[index].discription}</p>
                      <p>Type: ${data[index].type}</p>
                  `;
              });
          })
          .catch(error => console.error(error));
  }
}

const loadObjectsInSelectBox = (id) => {
  const objectSelector = document.getElementById("object_selector");
  const apiUrl = servername+ "/api/getOne/" + id;
  if (apiUrl) {
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              
                  const opt = document.createElement("option");
                  opt.value = data.name;
                  opt.innerHTML = data.name;
                  objectSelector.appendChild(opt);
              
              objectSelector.addEventListener("change", function() {
                  const index = objectSelector.selectedIndex;
                  const objectInfo = document.getElementById("object_info");
                  objectInfo.innerHTML = `
                      <p>Name: ${data[index].name}</p>
                      <p>Description: ${data[index].discription}</p>
                      <p>Type: ${data[index].type}</p>
                  `;
              });
          })
          .catch(error => console.error(error));
  }
}

function submitData() {
  let id = "";
  const submitButton = document.getElementById("submit_button");
  const objectSelector = document.getElementById("object_selector");
  const containerSelector = document.getElementById("container_selector");

  submitButton.addEventListener("click", function() {
      const selectedObject = objectSelector.value;
      const selectedContainer = containerSelector.value;

      const apiUrl = servername+"/api/relation";
      const requestBody = {
          item_name: selectedObject,
          container_name: selectedContainer
      };

    for(let rel of relations){
      if(rel.item_name == selectedObject)
      {
        id = rel._id;
      }
    }
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", servername+`/api/Rdelete/` + id, false);
    xhttp.send();

      fetch(apiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => {
          console.log("Data saved successfully:", data);
          // Perform any further actions after data is saved
      })
      .catch(error => console.error("Error saving data:", error));
  });
  
}
const setModal = () => {
  location.reload();
}
document.getElementById('editWindow').style.display = "none";
document.getElementById('relation-window').style.display = "none";
document.getElementById('addWindow').style.display = "none";
document.getElementById('tileInfo').style.display = "none";
document.getElementById('logWindow').style.display = "none";
loadRelations();
loadLogs();
loadBooks();
loadContainersInSelectBox();
submitData();

// Add event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);
const setPage = () => {
  location.reload();
}
