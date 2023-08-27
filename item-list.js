var currentItem = "";
var servername = "http://192.168.1.126:3000"
const setPostModal = () => {
    document.getElementById('addWindow').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
}

const setRelationModal = () => {
    document.getElementById('relationWindow').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
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
    currentItem = id;
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

const tileInfo = (item_name) => {
  let container_name = "not set";
  let object_name = "not set";
  getElementById('ObName').value = item_name

  console.log(getElementById('ObName'))
  for ( let rel of relations)
  {
      if(item_name == rel.item_name){
          container_name = rel.container_name;
          
      }
      else if(item_name == rel.container_name){
          object_name = rel.item_name
      }
  }
  console.log(item_name)
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

      const x = `
          <div class="col-4">
              <div class="card">
                  <div class="card-body">
                      <h3 onclick="tileInfo('${book.name}')" type="button" class="card-title" style="text-transform: capitalize;"><b>${icon_type} ${book.name}</b></h3>
                      <h6 class="card-title"></h6>
                      <h7 style="
                      display:inline-block;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      max-width: 23ch;" class="card-subtitle mb-2 text-muted">${book.discription}</h6>&nbsp;
                      &nbsp;
                      <h6 class="card-subtitle mb-2 text-muted"><b>Conatiner: ${container_name}</b></h6>
                      
                    
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

document.getElementById('editWindow').style.display = "none";
document.getElementById('addWindow').style.display = "none";
document.getElementById('relationWindow').style.display = "none";
 
loadRelations();
loadBooks();

// Add event listener for search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);
