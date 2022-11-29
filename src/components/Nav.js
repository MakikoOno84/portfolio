import {NavLink, useLocation} from 'react-router-dom';
import {ReactComponent as HamburgerIcon2 } from "../images/hamburger2.svg"
const Nav = () => {

    return (
            <ul>
              <li>
                {/* Added end to remove active class from Home when its not active. */}
                <NavLink to="/" end className='nav-link home'>{'<Home />'}</NavLink>
              </li>
              <li>
                <NavLink to="/works"  className='nav-link work'>{'<Work />'}</NavLink>
              </li>
              <li>
                <NavLink to="/experience" className='nav-link experience'>{'<Experience />'}</NavLink>
              </li>
              <li>
                <NavLink to="/about" className='nav-link about'>{'<About />'}</NavLink>
              </li>
            </ul>

        );
};

export default Nav