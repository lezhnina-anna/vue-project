export function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem('user');
}

export function getUser() {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
}
