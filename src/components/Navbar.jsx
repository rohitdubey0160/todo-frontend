import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [login, setLogin] = useState(localStorage.getItem("login"));

  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("logout");
    localStorage.removeItem("login");
    setLogin(null);
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setLogin(localStorage.getItem("login"));
    };
    window.addEventListener("localStorage-changed", handleStorageChange);
    return () => {
      window.removeEventListener("localStorage-changed", handleStorageChange);
    };
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Todo App</Link>
        </div>
        <ul className="nav-link">
          {login ? (
            <>
              <li className="list">
                <Link to="/">List</Link>
              </li>
              <li>
                <Link to="/add">AddTask</Link>
              </li>

              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
