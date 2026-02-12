import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import Form from "./pages/form/Form";
import Counter from "./pages/Counter";
import FilterData from "./components/FilterData";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/form" element={<Form/>} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/filter" element={<FilterData />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
