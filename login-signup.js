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
    
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            const userExists = users.some(u => u.username === username);
            if (userExists) {
                alert("User already exists, please Log in");
                window.location.href=('./Login.html');
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
        
                localStorage.setItem('user', JSON.stringify(newUser));
                localStorage.setItem('sessionToken', sessionToken);
        
                window.location.href = './Login.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error ocurred while signing up");
            });
        }}
        )}
    
    function generateSessionToken() {
        // Generate a random session token using a unique identifier method, like UUID
        return Math.random().toString(36).substr(2, 10);
    }
    