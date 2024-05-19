import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("authenticate")),
};

const FAKE_USER = {
  name: "admin",
  email: "admin@gmail.com",
  password: "123456",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(username, password) {
    if (username === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      localStorage.setItem("authenticate", "true");
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid username or password");
    }
  }
  function logout() {
    dispatch({ type: "logout" });
    localStorage.setItem("authenticate", "false");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth called outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
