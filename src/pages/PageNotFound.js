import { Link } from "react-router-dom"

const PageNotFound = () => {

    return (
        <div className="page-not-found-wrapper">
            <section >
                <h2>OOPS!</h2>
                <p>Page not found.</p>
                <p>Go to <Link to="/">Home</Link> page.</p>
            </section>
        </div>
    )
}

export default PageNotFound