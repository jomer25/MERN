import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Headers from "./components/Headers";
import Workouts from "./pages/Workouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuthContext from "./custom hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Headers />}>
            <Route index element={user ? <Workouts /> : <Navigate to="/login" />} />
            <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
