export const validation = (formData) => {
    const errors = {};
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        errors.email = "Enter valid Email Id";
        isValid = false;
    }

    // Password validation
    if (!formData.password) {
        errors.password = "Password is required";
        isValid = false;
    } 

    return { errors, isValid };
};
