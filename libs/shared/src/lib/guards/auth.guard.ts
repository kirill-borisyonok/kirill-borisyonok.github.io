export const authGuard = () => {
    const usetToken = localStorage.getItem('googleToken');
    return Boolean(usetToken);
};
