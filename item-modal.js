// Open and Set Edit Page
const setEditModal = (id) => {
    let edit = false;
      currentItem = id;
      document.getElementById('tileInfo').style.display = "none";
      document.getElementById('editWindow').style.display = "block";
      
      // Get information about the book using isbn
      for (let book of books){
        if(currentItem == book._id)
        {
            if (book.username == localStorage.getItem('User'))
            {
              edit = true;
            }
        }
      }
      if (edit == true)
      {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", servername+`/api/getOne/${id}`, false);
      xhttp.send();
      const book = JSON.parse(xhttp.responseText);
      const {
          name,
          discription,
          type
      } = book;
      document.getElementById('edt_name').value = name;
      document.getElementById('edt_discription').value = discription;
      document.getElementById('edt_type').value = type;
      document.getElementById('listWindow').style.display = "none";
    }
    else
    {
      alert("Wrong User")
      document.getElementById('editWindow').style.display = "none";
      document.getElementById('listWindow').style.display = "block";
    }
  }
  

  function backToItemlist(){
    location.reload();
  }
  
  // Open log-in window
  const setLog = () => {
    document.getElementById('logWindow').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
  }
  
  // Set logged in User
  const setLogOut = () => {
    localStorage.clear("User");
    alert("Logged Out")
    location.reload();
  }
  
  // Open Post Window
  const setPostModal = () => {
      document.getElementById('addWindow').style.display = "block";
      document.getElementById('listWindow').style.display = "none";
  }
  
  // Open Relation Window
  const setRelationModal = () => {
      document.getElementById('relationWindow').style.display = "block";
      document.getElementById('listWindow').style.display = "none";
  }
  
  // Open Tile Window
  const setTileModal = () => {
    document.getElementById('tileInfo').style.display = "block";
    document.getElementById('listWindow').style.display = "none";
  }

  const TileModal = () => {
    location.reload();
}