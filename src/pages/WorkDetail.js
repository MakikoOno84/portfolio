import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Skills from '../components/Skills'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import HighlightCode from '../components/HighlightCode'
import ReturnToTop from '../components/ReturnToTop'
import Helmet from 'react-helmet'
import {ReactComponent as LinkIcon} from '../images/link-thin.svg'
import { ReactComponent as GitHubIcon} from '../images/github-1.svg'

const WorkDetail = ({featuredImage}) => {
    const {id} = useParams();
    const restPath = `https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-work/${id}?acf_format=standard`
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    // Features/Highlight tab
    const [sortTab, setsortTab] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
                // Features/Highlight tab default
                if (data.acf.features !== false) {
                    setsortTab('features')
                } else {
                    setsortTab('highlight')
                }
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

const displayFlexibleContents = (content) => {
    if (content.acf_fc_layout==='code_content') {
        return (
            <figure className='code-figure'>
            <HighlightCode code={content.code}/>
            <figcaption>
                    {content.caption}
            </figcaption>
            </figure>
        )
    } else if (content.acf_fc_layout==='image_content') {
        return (
            <figure className='image-figure'>
                <img src={content.image.sizes.medium_large} alt={content.caption} />
            <figcaption>
                    {content.caption}
            </figcaption>
            </figure>
        )
    }
}
    // Features/Highlight tab
    const filterContent = (filterType) => {
        setsortTab(filterType);
    }

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
            </div>
            <section className='indiv-work-top'>
                <div className='overview'>
                    <h2>Overview</h2>
                    <p>{restData.acf.work_description}</p>
                </div>
                <div className='technologies'>
                    <h2>Technologies</h2>
                    <Skills skillArray={restData['mopf-skill-category']} skillCategory="front-end"/>
                </div>
                { restData.acf.links &&
                <div className='viewproject'>
                    <h2>View Project</h2>
                    <ul className='page-link viewproject-link'>
                        {restData.acf.links.map((link, i) =>
                            <>
                            {link.acf_fc_layout === 'live_site_link' &&
                            <li key={i}>
                                <a href={restData.acf.git_link} className='line-animation'>
                                    <LinkIcon/>
                                    <span>LiveSite</span>
                                </a>
                            </li>
                            }
                            { link.acf_fc_layout === 'github_link' &&
                            <li key={i}>
                                <a href={restData.acf.git_link} className='line-animation'>
                                    <GitHubIcon/>
                                    <span>GitHub Repository</span>
                                </a>
                            </li>
                            }
                            </>
                        )}

                    </ul>
                </div>
                }
                { restData.acf.collaborators &&
                <div className='collaborators'>
                    <h2>Collaborators</h2>
                    <ul className='page-link collaborators-link'>
                        {restData.acf.collaborators.map((collaborator,i) =>
                            <li key={i}>
                                <a 
                                    href={collaborator.link}
                                    className='line-animation'
                                >{collaborator.name}</a>
                            </li>
                        )}
                    </ul>
                </div>
                }
            </section>
            <section className='indiv-work-bottom'>
                <div className='sortbtn'>
                    { restData.acf.features !== false &&  
                        <button 
                            className={sortTab === 'features' && 'active'}
                            onClick={()=>filterContent('features')}    
                        >
                            <h2>Features</h2>
                        </button>
                    }
                    { restData.acf.highlight !== false &&  
                        <button 
                            className={sortTab === 'highlight' && 'active'}
                            onClick={()=>filterContent('highlight')}
                        >
                            <h2>Technical Highlights</h2>
                        </button>
                    }  
                </div>
                <div className='indiv-work-content'>
                {restData.acf.features !== false && 
                     <article className={sortTab==='features' && 'active'}>
                        {restData.acf.features.map((feature,i) =>
                            <div key={i}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                            </div> 
                        )}
                    </article>
                }
                {restData.acf.highlight !== false && 
                    <article className={sortTab==='highlight' && 'active'}>
                        {restData.acf.highlight.map((item,i) =>
                            <div key={i}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                {item.contents && 
                                    item.contents.map((content,i) =>
                                        <div key={i}>
                                            {displayFlexibleContents(content)}
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </article>
                }
                </div>
            </section>
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