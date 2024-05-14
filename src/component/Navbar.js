import React from 'react'
import {} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleAddTodoListClick = () => {
        navigate('/AddTodoList');
      };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
          <Link to="/AddTodoList" onClick={handleAddTodoListClick} className="nav-link active">Add Todo List</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar