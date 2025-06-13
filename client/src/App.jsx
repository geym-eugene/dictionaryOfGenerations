import { useEffect, useState } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
// import CategoryPage from "./components/CategoryPage";
import ZoomersPage from "./components/ZoomersPage";
import ProtectedRoute from "./components/utils/ProtectedRoute";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
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
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header user={user} logoutHandler={logoutHandler} />
      <Routes>
        {/* Публичные роуты */}

        {/* Роуты только для НЕавторизованных (логин/регистрация) */}
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/" />}>
          <Route
            path="/signup"
            element={<SignupPage signupHandler={signupHandler} />}
          />
          <Route
            path="/login"
            element={<LoginPage loginHandler={loginHandler} />}
          />
        </Route>

        {/* Защищённые роуты (только для авторизованных) */}
        <Route
          element={<ProtectedRoute isAllowed={user} redirectPath="/login" />}
        >
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/category/:categoryId" element={<ZoomersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
