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

  const [data, setData] = useState([]);
  const [published, setPublished] = useState([]);
  const [draft, setDraft] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async (state, author) => {
    try {
      const response = await axios.get("/blogs/all", {
        params: {
          state,
          author,
        },
      });

      const blogs = response.data;

      if (state === "published") {
        setPublished(blogs);
      } else if (state === "draft") {
        setDraft(blogs);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(published);
  console.log(draft);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      setAuth({ ...auth, user: parsedAuth.user, token: parsedAuth.token });
      setUser(parsedAuth.user);

      fetchApi("published", user?.username);

      fetchApi("draft", user?.username);
    }
  }, []);
  // console.log(user);
  console.log(user?.username);

  return (
    <AuthContext.Provider
      value={{ loading, data, user, auth, setAuth, published, draft }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
