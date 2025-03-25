function toggleForm() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
    clearErrors();
}

function clearErrors() {
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('register-error').classList.add('hidden');
}

function validatePassword(password) {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    document.getElementById('length-check').classList.toggle('valid', checks.length);
    document.getElementById('uppercase-check').classList.toggle('valid', checks.uppercase);
    document.getElementById('lowercase-check').classList.toggle('valid', checks.lowercase);
    document.getElementById('number-check').classList.toggle('valid', checks.number);
    document.getElementById('special-check').classList.toggle('valid', checks.special);

    return Object.values(checks).every(check => check);
}

document.getElementById('password').addEventListener('input', function(e) {
    validatePassword(e.target.value);
});

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorElement = document.getElementById('register-error');

    if (!validatePassword(password)) {
        errorElement.textContent = 'Password does not meet requirements';
        errorElement.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        errorElement.classList.remove('hidden');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
        errorElement.textContent = 'Email already registered';
        errorElement.classList.remove('hidden');
        return;
    }

    users.push({ name, email, phone, gender, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login to continue.');
    toggleForm();
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '/booking.html';
    } else {
        errorElement.textContent = 'Invalid email or password';
        errorElement.classList.remove('hidden');
    }
}