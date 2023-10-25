const form = document.getElementById('form');
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const btn = document.getElementById('eye')
const btn2 = document.getElementById('eye2')

// Show error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Show success message
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

// Check username
function checkUsername(input) {
    const nameRe = /^[a-zA-Z0-9]{3,}$/;
    if (input.value === '')
        showError(input, 'Username is required')
    else if (nameRe.test(input.value.trim())) {
        showSuccess(input)
    } else if (input.value.length < 3) {
        showError(input, 'Username must be at least 3 characters')
    } else {
        showError(input, 'Username is not valid')
    }
}

// E-Mail check
function checkMail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.length === 0) {
        showError(input, 'E-Mail is required')
    } else if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Password check & regex check
function regexPassword() {

    // Password regex
    const req = [
        {regex: /.{8,}/, index: 0},
        {regex: /[0-9]/, index: 1},
        {regex: /[a-z]/, index: 2},
        {regex: /[^A-Za-z0-9]/, index: 3},
        {regex: /[A-Z]/, index: 4},
    ]

    const reqList = document.querySelectorAll('.req-list li')
    const reqContainer = document.getElementById('req-container')


    // Check all req
    const isValidPassword = req.slice(0, 4).every(item => item.regex.test(password.value));
    const isPasswordMatch = password.value === password2.value;

    req.forEach(item => {
        const reqItem = reqList[item.index];

        if (item.regex.test(password.value)) {
            reqItem.firstElementChild.className = 'fa-solid fa-check';
        } else {
            reqItem.firstElementChild.className = 'fa-solid fa-circle';
            reqContainer.classList.remove('hidden');
        }
    });

    // Check req and passwords match
    if (isValidPassword && isPasswordMatch) {
        showSuccess(password);
        showSuccess(password2);
    } else if (password.value === '' && password2.value === '') {
        showError(password, 'Password is required')
        showError(password2, 'Password is required')
    } else if (!isValidPassword) {
        showError(password, 'Password is not valid')
        showError(password2, 'Password is not valid')
    } else {
        showError(password, 'Passwords do not match')
        showError(password2, 'Passwords do not match')
    }
}

// Block use space
function blockSpace(e) {
    if (e.key === ' ') {
        e.preventDefault()
    }
}

password.addEventListener('keyup', regexPassword)

password.addEventListener('keydown', blockSpace)
password2.addEventListener('keydown', blockSpace)

// Show, hide password
btn.addEventListener('click', () => {
    password.type = 'text';
    password2.type = 'text';
    btn.style.visibility = 'hidden';
    btn2.style.visibility = 'visible';
});

btn2.addEventListener('click', () => {
    password.type = 'password';
    password2.type = 'password';
    btn.style.visibility = 'visible';
    btn2.style.visibility = 'hidden';
});

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()

    checkUsername(username)
    checkMail(email)
    regexPassword()
})





