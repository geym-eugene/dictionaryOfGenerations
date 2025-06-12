import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import BebraPage from "./components/BebraPage";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [user, setUser] = useState();

  const signupHandler = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const res = await axiosInstance.post("/auth/signup", data);
    if (res.status !== 200) alert("Ошибка регистрации");
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  };

  const loginHandler = async (e, onSuccess) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.target));
      const res = await axiosInstance.post("/auth/login", data);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  // const logoutHandler = async () => {
  //   await axiosInstance.get("/auth/logout");
  //   setUser(null);
  //   setAccessToken("");
  // };

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route
          path="/signup"
          element={<SignupPage signupHandler={signupHandler} />}
        />
        <Route
          path="/login"
          element={<LoginPage signupHandler={loginHandler} />}
        />
        <Route path="/bebra" element={<BebraPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
