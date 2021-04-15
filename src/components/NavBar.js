import {Link} from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function NavBar(){

  const {isAuth, logout} = useAuth();

    return isAuth ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <p></p>
            <li>
              <Link to="/masters">Мастера</Link>
            </li>
            <p></p>
            <li>
              <Link to="/orders">Заявки</Link>
            </li>
            <p></p>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
    ) : null;
}