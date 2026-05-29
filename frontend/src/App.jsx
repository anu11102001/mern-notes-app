import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Notes from "./pages/notes";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
