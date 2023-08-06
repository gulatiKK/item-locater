var currentItem = "";
const onPostSubmit = () => {
    alert("The item has been added successfully")
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
      xhr.open("POST", "http://localhost:7800/api/item");
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
      location.reload();
    }

    function myFunction() {
        var x = document.getElementById("addWindow");
          x.style.display = "block";
      }

