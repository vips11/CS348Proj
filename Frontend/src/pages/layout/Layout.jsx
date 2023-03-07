import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => {
  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/people">People</Link>
          </li>
          <li className="nav__item">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
