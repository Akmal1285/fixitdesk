
// Email and Password validation utilities
export const validateEmail = (value: string) => {
    const v = value.trim();
    if (!v) return 'Email is required';
    // simple RFC-like check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(v) ? null : 'Enter a valid email';
  };

  export const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  

