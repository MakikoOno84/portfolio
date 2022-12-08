import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FeaturedWork from '../components/FeaturedWork'
import ReturnToTop from '../components/ReturnToTop';
import Loading from '../components/Loading';

const Home = () => {
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/pages/14?_embed'
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
            <div className='page-wrapper home-wrapper'>
                <section className='home-top' id="page-home">
                    <h1 className='intro1'>{restData.acf.headline}</h1>
                    <p className='intro2'>{restData.acf.introduction}</p>
                    <div className='intro3 page-link link-button'>
                    <Link to='/experience' className=' line-animation'>More on My Experience</Link>
                    </div>
                    <div className="scrolldown2"><span>Scroll</span></div>
                </section>
                <section className='home-bottom'>
                    <FeaturedWork />
                    <div className='page-link link-button'>
                        <Link to='/works' className='see-all-work line-animation'>See All Work</Link>
                    </div>
                </section>
                <ReturnToTop />
            </div>
            </>
        : 
            <Loading />
        }
        </>   
    )
  
}

export default Home
