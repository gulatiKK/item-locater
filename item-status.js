let data = {};
let checkbox = "";

// Set if item status, public or private
const setStatus = (id, toggleNum) => {
checkbox = document.getElementById(toggleNum);

  // Setting status to private
  // Toggle item visability when user is logged in
  if(checkbox.checked && localStorage.getItem('User') != null){
    setStatusPrivate(id)
  }
  // If checkbox is unchecked
  else
  {
    setStatusPublic(id)
  }
}

// Set item status to public
const setStatusPublic = (id) => {
  const data = {
    status: "public"
  };
for (let book of books)
{
  if(id == book._id)
  {
    if(book.username == localStorage.getItem('User'))
    {
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
  alert("Item is Public")
    }
    else
    {
      alert("Wrong User");
    }
  }
  }
}

// Set item status to private
const setStatusPrivate = (id) => {
  data = {
    status: "private"
  };
  for (let book of books)
  {
    if(id == book._id)
    {
      // Check if right user logged in
      if(book.username == localStorage.getItem('User'))
      {

        // Set xhttp request
        let xhr = new XMLHttpRequest();
        xhr.open("POST", servername+"/api/update/" + id);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
           console.log(xhr.status);
           console.log(xhr.responseText);
           }
        };

        // Send xhttp request
        xhr.send(JSON.stringify(data));
        alert("Item is Private");
      }
      else
      {
        alert("Wrong User")
        document.getElementById(checkbox).checked = false;
      }

    }
  }
}