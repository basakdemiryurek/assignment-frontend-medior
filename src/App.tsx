import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Main } from "components/Main";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Vegetables } from "components/Vegetables";
import { Fruits } from "components/Fruits";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin/vegetables" element={<Vegetables />} />
          <Route path="/admin/fruits" element={<Fruits />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
