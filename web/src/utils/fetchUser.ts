export const fetchUser = () => {
  const user = localStorage.getItem('user');
  const parsedUser = user !== null ? JSON.parse(user) : null;

  // If you want to clear localStorage when user is undefined
  if (parsedUser === null) {
    localStorage.clear();
  }

  return parsedUser;
};
