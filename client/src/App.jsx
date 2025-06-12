import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import BebraPage from "./components/BebraPage";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
// import CategoryPage from "./components/CategoryPage";
import ZoomersPage from "./components/ZoomersPage"

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

  const logoutHandler = async () => {
    await axiosInstance.get("/auth/logout");
    setUser(null);
    setAccessToken("");
  };

  useEffect(() => {
    axiosInstance("/auth/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} onLogout={logoutHandler} />

      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/category/:categoryId" element={<ZoomersPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
