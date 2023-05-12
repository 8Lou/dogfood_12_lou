import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Modal from "./components/Modal";
import { Header, Footer } from "./components/Main"; // index.jsx
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldData from "./pages/Old_data";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

//2 связка и создание компонента
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
  const [token, setToken] = useState(localStorage.getItem("token12"));
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [baseData, setBaseData] = useState([]);
  const [goods, setGoods] = useState(baseData);
  // Сохранить в переменную user значение, кот находится внутри useState

  useEffect(() => {
    if (user) {
      setUserId(localStorage.getItem("user12-id"));
      setToken(localStorage.getItem("token12"));
    } else {
      localStorage.removeItem("user12-id");
      localStorage.removeItem("token12");
      setUserId(null);
      setToken(null);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetch("https://api.react-learning.ru/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBaseData(data.products);
        });
    }
  }, [token]);

  useEffect(() => {
    setGoods(baseData);
  }, [baseData]);

  return (
    <>
      <Header
        user={user}
        upd={setUser}
        searchArr={baseData}
        setGoods={setGoods}
        setSearchResult={setSearchResult}
        setModalOpen={setModalOpen}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} setActive={setModalOpen} />}
          />

          <Route
            path="/catalog"
            element={
              <Catalog
                goods={goods}
                setBaseData={setBaseData}
                userId={userId}
              />
            }
          />
          <Route
            path="/old"
            element={<OldData searchText={searchResult} goods={goods} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </main>
      <Footer />
      <Modal
        isActive={modalOpen}
        setIsActive={setModalOpen}
        setUser={setUser}
      />
    </>
  );
};

export default App;
