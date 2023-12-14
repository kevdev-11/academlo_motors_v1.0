

export const extractValidation = (result) =>{
    
    let errorMessages;
    let data;
   
    const hasError = !result.success;
        
    if(hasError) {
        errorMessages = JSON.parse(result.error.message);
        };
    
    if(!hasError) {
    data = result.data;
    };

    return { hasError, errorMessages, data };
}