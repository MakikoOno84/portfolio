import {NavLink} from 'react-router-dom'
import HomeIcon from '../images/home.svg'
import WorkIcon from '../images/work.svg'
import ExpIcon from '../images/experience.svg'
import AboutIcon from '../images/about.svg'

const NavMobile = () => {

    return (
        <div className='navmobile-wrapper'>
     <nav>
        <ul>
            <li>
            <NavLink to="/" className='nav-link home'><img src={HomeIcon} alt="home" /></NavLink>
            <span>Home</span>
            </li>
            <li>
            <NavLink to="/works" className='nav-link work'><img src={WorkIcon} alt="work" /></NavLink>
            <span>Work</span>
            </li>
            <li>
            <NavLink to="/experience" className='nav-link experience'><img src={ExpIcon} alt="experience" /></NavLink>
            <span>Experience</span>
            </li>
            <li>
            <NavLink to="/about" className='nav-link about'><img src={AboutIcon} alt="about" /></NavLink>
            <span>About</span>
            </li>
        </ul>
      </nav>
      </div>
        )
}

export default NavMobile