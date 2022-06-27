import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthServiceProvider } from "../contexts/AuthServiceProvider";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="result" element={<Result />} />
          </Routes>
        </Layout>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
