import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/session";

const Navigation = () => {
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout())
  }
  return (
    <ul>
      <li><NavLink to="/">Homepage</NavLink></li>
      {!currentUser && (
        <>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        </>
      )}
      {currentUser && (
        <button onClick={handleClick}>Logout</button>
      )}
    </ul>
  )
}

export default Navigation;