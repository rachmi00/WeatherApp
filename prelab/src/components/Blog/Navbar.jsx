import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
  <div className="container-fluid" >
    <a className="navbar-brand fw-bold fs-3 "  href="#">Rach  <FontAwesomeIcon icon={faStar} className="google-icon" style={{color: "pink"}} /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse nav" id="navbarNavDropdown">
      <ul className="navbar-nav mx-5 nav">
        <li className="nav-item fw-bold">
          <NavLink to="/weather" className="nav-link active" aria-current="page">Weather App</NavLink>
        </li>
        <li className="nav-item fw-bold">
          <NavLink to ="/login" className="nav-link" href="#">Login</NavLink>
        </li>
        <li className="nav-item fw-bold">
          <a className="nav-link" href="#">About Us</a>
        </li>
       
      </ul>
    </div>
  </div>
   
 
</nav>
    )
}
export default Navbar