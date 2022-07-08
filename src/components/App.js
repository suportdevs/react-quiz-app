import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthServiceProvider } from "../contexts/AuthServiceProvider";
import "../styles/App.css";
import Layout from "./Layout";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import Videos from "./Videos";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <Layout>
          <Routes>
            <Route
              index
              path="/"
              element={
                <PrivateRoute>
                  <Videos />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="quiz/:id"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="result/:id"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Layout>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
