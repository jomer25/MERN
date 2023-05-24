import { Link, Outlet } from "react-router-dom";
import useAuthContext from "../custom hooks/useAuthContext";
import useLogoutAuth from "../custom hooks/useLogoutAuth";

const Headers = () => {
  const { user } = useAuthContext()
  const { logout } = useLogoutAuth()

  const handleClickLogout = () => {
    logout()
  }

  return ( 
    <header>
      <nav>
        <Link to="/">Workouts</Link>
        {
          user ? (
            <>
              <span>{ user.email }</span>
              <button onClick={handleClickLogout}>Log out</button>   
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Signup</Link>
            </>
          )
        }
      </nav>
      <Outlet />
    </header>
   );
}
 
export default Headers;