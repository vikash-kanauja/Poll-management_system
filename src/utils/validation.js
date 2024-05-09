
export const validateSignup = (formData) => {
    const errors = {};
    let isValid = true;

    if ( !formData.firstName.trim()) {
        errors.firstName = "First Name is required";
        isValid = false;
    }
    if ( !formData.lastName.trim()) {
        errors.lastName = "Last Name is required";
        isValid = false;
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
      } else if (formData.password.trim().length < 8) {
        errors.password =  "Password must be at least 8 characters long";
      }

      if (!formData.confirmPassword.trim()) {
        errors.confirmPassword = "Password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword =  "Password must be at least 8 characters long";
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
