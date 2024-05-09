
export const validateSignup = (formData) => {
    const errors = {};
    let isValid = true;

    if ( !formData.firstName.trim()) {
        errors.firstName = "First Name is required";
        isValid = false;
    }else if(formData.firstName.trim().length < 4){
        errors.firstName = "firstName must be contain 4 character"
    }
    if ( !formData.lastName.trim()) {
        errors.lastName = "Last Name is required";
        isValid = false;
    }else if(formData.firstName.trim().length < 4){
        errors.lastName = "lastName must be contain 4 character"
    }
    if ( !formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
        isValid = false;
    }
    if ( !formData.roleId.trim()) {
        errors.roleId = "Role is required";
        isValid = false;
    }

    if (!formData.password.trim()) {
        errors.password = "Password is required";
        isValid = false;
      } else if (formData.password.trim().length < 8) {
        errors.password =  "Password must be at least 8 characters long";
        isValid = false;
      }

      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Password is required";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword =  "The password and confirmation password do not match.";
        isValid = false;
      }

    return { errors, isValid };
};

export const validateLogin = (formData) => {
    const errors = {};
    let isValid = true;
    if ( !formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
    } else if ( !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
        isValid = false;
    }
    if (!formData.password.trim()) {
        errors.password = "Password is required";
        isValid = false;
    }

    return { errors, isValid };
};
