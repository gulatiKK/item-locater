// Load Container Options in relation dropdown
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
                    console.log(opt);
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


  // Change relation when dropdown selected
  function onRelationSubmit(id)
  {
    let container_name = document.getElementById('container_selector').value;
    let deleteId = "";
    let item_name = "";

    for(let book of books)
    {
      if(book._id == id){
        item_name = book.name
      }
    }

    for(let rel of relations){
      if(rel.item_name == item_name){
        deleteId = rel._id;
      }
    }
    // Delete existing relation to replace with other
    // Create new relation in place of old one
    newRelation(item_name, container_name, deleteId)
    // Reload relations to ensure no errors
    loadRelations();
  }


// Load Relation
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

//Edit Relation
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


const newRelation = (item_name, container_name, deleteId) => {
  const apiUrl = servername+"/api/relation";
  const body = {
    item_name: item_name,
    container_name: container_name
  }; 

  console.log(deleteId)
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", servername+`/api/Rdelete/` + deleteId, false);
  xhttp.send();
  
  if(container_name != "none")
  {
  fetch(apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})

.then(response => response.json())
.then(data => {
    console.log("Data saved successfully:", data);
    // Perform any further actions after data is saved
})

.catch(error => console.error("Error saving data:", error));
  }
}