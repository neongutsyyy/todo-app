function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          window.location.href = './todo.html';
        } else {
          alert("Invalid username or password");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while logging in.");
      });
  }
  
  function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const userExists = users.some(u => u.username === username);
        if (userExists) {
          alert("User already exists");
        } 
        else {
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(newUser => {
            alert("SignUp successfull!");
            window.location.href = './login.html';
            localStorage.setItem('user', JSON.stringify(newUser));
            })
            .catch(error => {
              console.error('Error:', error);
              alert("An error occurred while signing up.");
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while signing up.");
      });
  }