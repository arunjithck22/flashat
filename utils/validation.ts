export const validateEmailOrUsername = (input: string): string | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernamePattern = /^[a-zA-Z0-9._-]{3,20}$/;
  
    if (emailPattern.test(input)) {
      return null; // Valid email
    } else if (usernamePattern.test(input)) {
      return null; // Valid username
    } else {
      return "Please enter a valid email or username";
    }
  };
  
  export const validatePassword = (password: string): string | null => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[@$!%*?&]/;
  
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!number.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!specialChar.test(password)) {
      return "Password must contain at least one special character (@$!%*?&).";
    }
    
    return null; // No errors
  };
  

