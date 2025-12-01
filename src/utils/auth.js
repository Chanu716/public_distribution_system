export const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const isAuthenticated = () => {
    return !!getCurrentUser();
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

export const loginUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};
