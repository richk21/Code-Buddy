import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import FindBuddy from "./pages/FindBuddy/FindBuddy";
import { Login } from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/match"
            element={
              <ProtectedRoute>
                <FindBuddy />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
