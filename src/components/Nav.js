import {NavLink} from 'react-router-dom';
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