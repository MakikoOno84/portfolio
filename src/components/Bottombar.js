import { Link } from "react-router-dom"
const Bottombar = () => {

    return (
        <>
            <Link to={`/`}>
                Home
            </Link>
            <Link to={`/`}>
                Work
            </Link>
            <Link to={`/`}>
                Experience
            </Link>
            <Link to={`/`}>
                About
            </Link>
        </>
    )
}

export default Bottombar