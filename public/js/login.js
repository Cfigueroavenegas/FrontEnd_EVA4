const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')
const error = document.getElementById('error')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    }


    if (username.value.trim().length !== 0 && password.value.trim().length !== 0){
    
        if (data.username == "admin" && data.password == "admin"){
            window.location.href = "../index.html"
        } else if (data.username == "admin" && data.password !== "admin"){
            error.textContent = "Contraseña incorrecta!!!"
            error.style.display = "block"
        } else {
            window.location.href = "catalogo.html"
        }
    } else {
        error.textContent = "Debe escribir un usuario y una contraseña.";
        error.style.display = "block";

    }
})




