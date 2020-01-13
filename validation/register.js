const Validator = require("validator");
const isEmpty = require("is-empty");

//Export vRI function that takes in data sent from registration form as a parameter 
module.exports = function validateRegisterInput(data) {
  let errors = {}; //error object

// Convert empty fields to an empty string so we can use validator functions (validator only uses strings)
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

// Email checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  } 

// Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};