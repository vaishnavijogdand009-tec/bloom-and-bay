import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";

function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={sticky ? "navbar sticky" : "navbar"}>
      <div className="logo">
        <Link to="/">BLOOM & BAY</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-icons">
        <FiSearch />
        <FiShoppingCart />
        <Link to="/login">
          <FiUser />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;