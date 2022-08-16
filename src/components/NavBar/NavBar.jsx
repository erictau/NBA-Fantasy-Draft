import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar navbar bg-primary text-white">
      <div className="navbar-left">
        <Link to="" className="btn text-light">
          Home
        </Link>
        &nbsp;
        <Link to="/drafts/new" className="btn text-light">
          New Draft
        </Link>
      </div>
      <div className="navbar-right d-flex align-items-center">
        <span className="p-1 m-1">Welcome, {user.name}</span>
        &nbsp;&nbsp;| &nbsp;
        <Link to="" onClick={handleLogOut} className="btn text-light">
          Log Out
        </Link>
      </div>
    </nav>
  );
}
