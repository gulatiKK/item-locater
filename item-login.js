// When login submit button pressed
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

  const onSignSubmit = () => {
    let username = document.getElementById('userSignUpName').value;
    let password = document.getElementById('signUpPassword').value;
    
      // Create an object with the updated data
      const data = {
        userName: username,
        password: password
      };
    
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/log");
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

const onSignModal = () => {
  document.getElementById('listWindow').style.display = "none";
  document.getElementById('signWindow').style.display = "block";
}