import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"; 
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import Skills from './Skills';
import { featuredImage } from "../scripts/script";

const FeaturedWork = () => {
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-work?mopf-featured=34&_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
  
    return (
        <>
        { isLoaded ?
            <>
            <h2>Featured Work</h2>
            <div className="featured-work-wrapper">
                {restData?.map( cpost => 
                    <article key={cpost.id} id={`post-${cpost.id}`} className='work-item'>
                    {cpost._embedded['wp:featuredmedia'][0] &&
                        <Link to={`/workdetail/${cpost.id}`}
                        >
                            {cpost._embedded['wp:featuredmedia'][0] &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(cpost._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        </Link>
                    }
                    <div className="work-content">
                        <h3>
                            <Link to={`/workdetail/${cpost.id}`}
                                    >
                            {cpost.title.rendered}
                            </Link>
                        </h3>
                        <Skills skillArray={cpost['mopf-skill-category']} skillCategory="front-end"/>
                    </div>
                </article>
                )}
            </div>
            </>
        : 
            <Loading />
        }
        </>   
    )
  
}

export default FeaturedWork