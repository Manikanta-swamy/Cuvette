// src/components/navbar/Navbar.js
import { Link } from "react-router-dom";
import logo from "../assets/BrandLogo.png"; // Adjust the path as necessary

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <img src={logo} width="100px" alt="brand-logo" />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:underline">Contact</Link>
          </li>
          <li>
            <Link to="/" onClick={()=>{localStorage.removeItem("token")}} className="hover:underline">Log Out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
