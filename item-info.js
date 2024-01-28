let container_name = "not set";
const tileInfo = (id) => {
    // Setting up Fixed Button veiw
    document.getElementById('fixedbutton2').style.display = "block";
    document.getElementById('fixedbutton3').style.display = "block";
    document.getElementById('fixedbutton4').style.display = "block";
    $("#container_selector").on('change', function() {
      onRelationSubmit(id)
    });

    // Setting up value of Container Selector
    setActiveContainer(id);

    // Setting up variables, and reading JSON response text:
      currentItem = id;
      document.getElementById('tileInfo').style.display = "block";
      document.getElementById('listWindow').style.display = "none";

      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", servername+`/api/getOne/${id}`, false);
      xhttp.send();
  
      const book = JSON.parse(xhttp.responseText);
      const {
          name,
          discription,
          type
      } = book;

    // Setting up container
    for(let rel of relations)
    {
      if(name == rel.item_name)
      {
        container_name = rel.container_name
      }
    }
      // Setting up all Jquerry Onclicks
      JqueryOnclicks(name)

      // Setting up Tile HTML: 
      tileHTML(name, discription)
}

// Open tile veiw from container
const ConTile = (Name) => {
  for(let book of books)
  {
    if(Name == book.name)
    {
      console.log(book._id)
      tileInfo(book._id);
    }
  }
  }

const  setActiveContainer = (id) => {
  // Changing value of 'containerSelector' HTML Drop Down
  for (let book of books)
  {
    if(id == book._id)
    {
    // Start if block
      document.getElementById('itemUser').innerHTML = "Item Added By: " + book.username
      // setting the relations drop down
      for(let rel of relations)
      {
        const containerSelector = document.getElementById("container_selector")

        if(book.name == rel.item_name)
        {
          containerSelector.value = rel.container_name;
          break;
        }
        else if(book._id == id)
        {
          $("#container_selector option[value='none']").remove();
          const opt = document.createElement("option");
          opt.value = "none";
          opt.innerHTML = "none";
          containerSelector.appendChild(opt);
          containerSelector.value = "none";
        }
      }
      // end: setting the relations drop down
    }
    // If Block End Here
  }
}

const JqueryOnclicks = (name) => {
// Jquery onclicks:
// Container name:
if(container_name != "not set")
{
  document.getElementById('ConTitle').onclick = function() {
  ConTile(container_name);
  };
}

//Fixed Buttons:
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

const tileHTML = (name, discription) => {
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
      for(rel2 of relations){

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
}