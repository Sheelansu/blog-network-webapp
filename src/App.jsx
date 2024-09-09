import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from 'react-router-dom'
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          logout();
        }
      })
      .finally(() => setLoading(false));
  });

  return !loading ? (
    <div className=" min-h-screen flex flex-wrap content-between bg-indigo-200">
      <div className='w-full min-h-screen flex flex-col'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    </div>
  );
}

export default App;
