export const validation = (formData)=>{
    const error={
    };
    let isValid = true;
    if(!formData.email.trim()){
        // {error.email : "Email is require";}
        error.email ="Email is require";
        isValid=false;
    }
    else if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(formData.email)){
        error.email = "Enter valida Email Id"
        isValid = false;
    }

    if(!formData.password ){
        error.password = "Password is requier"
        isValid = false;
    }else if ((formData.password).length <= 6 ){
        error.password = "Password is too sort"
        isValid = false
    }
    // console.log(error ,"err" ,isValid,"isValid");
    return {error,isValid};
}
