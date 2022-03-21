import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/auth/AuthRoute";
import Home from "./pages/home";
import Login from "./pages/login";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
