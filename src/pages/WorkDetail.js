import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Skills from '../components/Skills'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import HighlightCode from '../components/HighlightCode'
import ReturnToTop from '../components/ReturnToTop'
import Helmet from 'react-helmet'

const WorkDetail = ({featuredImage}) => {
    const {id} = useParams();
    const restPath = `https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-work/${id}?acf_format=standard`
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
        <Helmet>
            <title>{restData.yoast_head_json.title}</title>
            <meta name="description" content={restData.yoast_head_json.description}/>
        </Helmet>
        <div className='page-wrapper indiv-work-wrapper'>
            <h1>{restData.title.rendered}</h1>
            <div className='content-image'>
                {restData.acf.video ? 
                    <figure >
                        <video autoPlay controls muted>
                            <source src={restData.acf.video} type='video/mp4'/>
                        </video>
                    </figure>
                :parse(restData.content.rendered)}
                <p>{restData.acf.work_description}</p>
            </div>
            <Skills skillArray={restData['mopf-skill-category']} skillCategory="front-end"/>
            { restData.acf.live_site_link &&
            <div className='page-link link-button'>
                <a href={restData.acf.live_site_link} className='line-animation'>LiveSite</a>
            </div>
            }

            {restData.acf.highlight && 
                <article>
                <h2>Highlights</h2>
                {restData.acf.highlight.map((item,i) =>
                    <div key={i}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.code && 
                        <figure className='code-figure' >
                        <HighlightCode code={item.code}/>
                        <figcaption>
                                {item.title}
                        </figcaption>
                        </figure>
                    }
                
                    </div>
                )}
                </article>
            }
            {restData.acf.issuesbugs_and_how_i_fixed && 
                <article>
                <h2>Issues/Bugs and How I Fixed</h2>
                {restData.acf.issuesbugs_and_how_i_fixed.map((item,i) =>
                    <div key={i}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.code && 
                        <figure className='code-figure' >
                        <HighlightCode code={item.code}/>
                        <figcaption>
                                {item.title}
                        </figcaption>
                        </figure>
                    }
                
                    </div>
                )}
                </article>
            }
            {restData.acf.process && 
                <article>
                <h2>Process</h2>
                {restData.acf.process.map((item,i) =>
                    <div key={i}>
                    <h3 >{item.title}</h3>
                    <p >{item.description}</p>
                    {item.code && 
                        <figure className='code-figure' >
                            <HighlightCode code={item.code}/>
                            <figcaption>
                                {item.title}
                            </figcaption>
                        </figure>
                    }
                
                    </div>
                )}
                </article>
            }
            <div className='page-bottom-links'>
                <Link to='/works' className='page-link line-animation'>Go Back All Work</Link>
                <ReturnToTop />
            </div>
        </div>
        </>
        : <Loading />
    }
    </>
)
}

export default WorkDetail