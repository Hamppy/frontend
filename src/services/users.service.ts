import { handleResponse } from "../_helpers/service.helpers";
import { User } from "../types/user";
import { API_URL } from "../_config/api.config";

export const usersService = {
  login,
  logout,
  register,
};

function login(email: string, password: string): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${API_URL}/users/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      setUserInLocalStorage(user)
      return user;
    });
}

function register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  };

  return fetch(`${API_URL}/users/register`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      setUserInLocalStorage(user)
      return user;
    });
}

function setUserInLocalStorage(user: User) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("user");
}
