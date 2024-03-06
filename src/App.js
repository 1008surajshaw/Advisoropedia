import "./App.css";
import { useState } from "react";
import Navbar from "./components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setProgress={setProgress}
              key="general"
              pageSize={5}
              category="general"
            />
          }
        />
        <Route
          exact
          path="/business"
          element={
            <Home
              setProgress={setProgress}
              key="business"
              pageSize={5}
              category="business"
            />
          }
        ></Route>
        <Route
          exact
          path="/entertainment"
          element={
            <Home
              setProgress={setProgress}
              key="entertainment"
              pageSize={5}
              category="entertainment"
            />
          }
        ></Route>
        <Route
          exact
          path="/general"
          element={
            <Home
              setProgress={setProgress}
              key="general"
              pageSize={5}
              category="general"
            />
          }
        ></Route>
        <Route
          exact
          path="/health"
          element={
            <Home
              setProgress={setProgress}
              key="health"
              pageSize={5}
              category="health"
            />
          }
        ></Route>

        <Route
          exact
          path="/science"
          element={
            <Home
              setProgress={setProgress}
              key="science "
              pageSize={5}
              category="science"
            />
          }
        ></Route>
        <Route
          exact
          path="/sports"
          element={
            <Home
              setProgress={setProgress}
              key="sports"
              pageSize={5}
              category="sports"
            />
          }
        ></Route>
        <Route
          exact
          path="/technology"
          element={
            <Home
              setProgress={setProgress}
              key="technology"
              pageSize={5}
              category="technology"
            />
          }
        ></Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />

        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
}

export default App;
