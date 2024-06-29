document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".container");
    const firstName = form.querySelector("#firstName");
    const lastName = form.querySelector("#lastName");
    const email = form.querySelector("#email");
    const queryTypeGeneral = form.querySelector("#generalEnquiry");
    const queryTypeSupport = form.querySelector("#supportRequest");
    const message = form.querySelector("#messageField");
    const consent = form.querySelector("#consent");
    const submitButton = form.querySelector("button");
    const successMessage = document.querySelector(".success-msg");
    const radio = document.querySelectorAll('.radiofield');

    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.textContent = message;
        input.classList.add("error");
        input.parentElement.insertBefore(error, input.nextSibling);
    }

    function clearErrors() {
        const errors = document.querySelectorAll(".error-message");
        errors.forEach(error => error.remove());
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => input.classList.remove("error"));
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    function validateForm() {
        clearErrors();
        let valid = true;
        if (firstName.value.trim() === "") {
            showError(firstName, "This field is required");
            valid = false;
        }
        if (lastName.value.trim() === "") {
            showError(lastName, "This field is required");
            valid = false;
        }
        if (email.value.trim() === "") {
            showError(email, "Email Address cannot be empty");
            valid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, "Please enter a valid email address");
            valid = false;
        }
        if (!queryTypeGeneral.checked && !queryTypeSupport.checked) {
            showError(queryTypeGeneral.parentElement, "Please select a query type");
            showError(queryTypeSupport.parentElement, "Please select a query type");
            valid = false;
        }
        if (message.value.trim() === "") {
            showError(message, "This field is required");
            valid = false;
        }
        if (!consent.checked) {
            showError(consent.parentElement, "To submit the form, please consent to be contacted");
            consent.parentElement.style.border = 'none';
            valid = false;
        }

        return valid;
    }
    firstName.addEventListener("input", clearErrors);
    lastName.addEventListener("input", clearErrors);
    email.addEventListener("input", clearErrors);
    message.addEventListener("input", clearErrors);

    queryTypeGeneral.addEventListener("change",()=>{
        clearErrors();
        radio.forEach((rr)=>{rr.style.borderColor = 'hsl(186, 15%, 59%)';})
    });
    queryTypeSupport.addEventListener("change",()=>{
        clearErrors();
        radio.forEach((rr)=>{rr.style.borderColor = 'hsl(186, 15%, 59%)';})
    });
    consent.addEventListener("change", clearErrors);
       
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (validateForm()) {
            successMessage.classList.remove("hidden")
            document.querySelectorAll('input').forEach((inp)=>{
                inp.value = ' ';
              })
            message.value = '';
            consent.checked = false;
            queryTypeGeneral.checked = false;
            queryTypeSupport.checked = false;
        }
    });
});