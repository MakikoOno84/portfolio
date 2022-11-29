import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Skills from '../components/Skills'
import parse from 'html-react-parser'
import ReturnToTop from '../components/ReturnToTop'
import Helmet from 'react-helmet'
import { featuredImage } from '../scripts/script'
const Works = () => {
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-work?_embed'
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

    function excerpt(text) {
        const MAX_LENGTH = 150
        
        if(text.length > MAX_LENGTH){
            text = text.substr(0, MAX_LENGTH) + '...'
        }
        return text;
    }

    return (
        <>
        { isLoaded ? 
            <>
            <Helmet>
                <title>Portfolio of Makiko Ono</title>
                <meta name="description" content='Front End Development Portfolio of Makiko Ono.'/>
            </Helmet>
            <div className='page-wrapper work-wrapper'>
            <h1 id="page-top">Work</h1> 
            {/* Array?: Check if array exists to avoid  "Cannot read properties of undefined (reading 'map')" error
            https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map
            */}
            {restData?.map( cpost => 
                 <article key={cpost.id} id={`post-${cpost.id}`} className='work-item'>
                 {/* {cpost._embedded['wp:featuredmedia'][0] &&
                    <Link to={`/workdetail/${cpost.id}`}
                    //   state= {{movie: oneContent, base_url: base_url}}
                    >
                        <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(cpost._embedded['wp:featuredmedia'][0])}></figure>
                    </Link>
                 } */}
                <div className='work-content'>
                        <Link to={`/workdetail/${cpost.id}`}
                            //   state= {{movie: oneContent, base_url: base_url}}
                                ><h2>{cpost.title.rendered}</h2>
                        </Link>
                    <p>{excerpt(cpost.acf.work_description)}</p>
                    <Skills skillArray={cpost['mopf-skill-category']} skillCategory="front-end"/>
                 </div>
                 {cpost._embedded['wp:featuredmedia'][0] &&
                    <Link to={`/workdetail/${cpost.id}`} className='work-image'
                    >
                        {/* {parse(cpost.content.rendered)} */}
                        <figure dangerouslySetInnerHTML={featuredImage(cpost._embedded['wp:featuredmedia'][0])}></figure>
                    </Link>
                 }
             </article>
            )}
            <ReturnToTop/>
            </div>
            </>
         : <Loading />
            
        }
        </>
    )
}

export default Works
