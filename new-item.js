const onPostSubmit = () => {
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
  xhr.open("POST", "http://localhost:7800/api/update/" + currentItem);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      // Call the loadbooks function here if the update was successful
    }
  };
}