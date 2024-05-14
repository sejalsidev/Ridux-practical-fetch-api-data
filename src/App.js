import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import AddTodoList from "./component/AddTodoList";
import Todo from "./component/Todo";

function App() {
  return (
    <div className="App">
      {/*  <Todo /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/AddTodoList" element={<AddTodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
