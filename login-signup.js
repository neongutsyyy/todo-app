function login() {
const username = document.getElementById('login-username').value;
const password = document.getElementById('login-password').value;

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const sessionToken = generateSessionToken();

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('sessionToken', sessionToken);

        window.location.href = './index.html';
    } else {
        alert("Invalid username or password");
    
    }
    })
    .catch(error => {
    console.error('Error:', error);
    alert("An error ocurred while logging in.")
    });
}
  
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    fetch(`http://localhost:3000/users?username=${username}`)
    .then(response => response.json())
    .then(users => {
      if (users.length > 0) {
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
            const sessionToken = generateSessionToken();
            window.location.href = './Login.html';

            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('sessionToken', sessionToken);
            })

            .catch(error => {
            console.error('Error:', error);
            alert("Error occured while Generating Token")
        });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error occured while signig in!")
    });
}

function generateSessionToken() {
    // Generate a random session token using a unique identifier method, like UUID
    return Math.random().toString(36).substr(2, 10);
}
