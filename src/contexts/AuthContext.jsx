import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [user, setUser] = useState(null);

  // axios config
  axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const response = await axios.get("/blogs/all", {
        params: {
          state: "published"
        },
      });

      const blogs = response.data;
      setPublished(blogs);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(published);
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      setAuth({ ...auth, user: parsedAuth.user, token: parsedAuth?.token });
      setUser(parsedAuth.user);

      fetchApi(); 

    }
  }, []);
  // console.log(user);
  // console.log(user?.username);
  // console.log(auth.token);

  return (
    <AuthContext.Provider
      value={{ loading, user, auth, setAuth, published }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
