
export const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
}

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};