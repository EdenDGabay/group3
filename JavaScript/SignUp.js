document.addEventListener("DOMContentLoaded", function() {
    const users = [];

    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const birthdate = document.getElementById("birthdate").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            birthdate,
            password,
            profilePicture: '',
            location: '',
            about: ''
        };

        users.push(newUser);

        alert("Sign up successful!");
        signupForm.reset();

        window.location.href = "../Html/HomePage.html";
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
