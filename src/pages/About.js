import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Helmet from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLaptopCode, faServer, faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'

const About = () => {
    // About page
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/pages/62?_embed'
    const [restData, setData] = useState([])
    // Skills
    const restPathSkill = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-skill-category?per_page=100'
    const [restSkillDataFront, setSkillDataFront] = useState([])
    const [restSkillDataBack, setSkillDataBack] = useState([])
    const [restSkillDataDev, setSkillDataDev] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            const responseSkill = await fetch(restPathSkill)
            if ( response.ok ) {
                const data = await response.json()
                const dataSkill = await responseSkill.json()
                let frontArray = []
                let backArray = []
                let devArray = []
                for (let i=0; i < dataSkill.length ; i++) {
                    if (dataSkill[i].parent===3) {
                        frontArray.push(dataSkill[i].name)
                    } else if (dataSkill[i].parent===13) {
                        backArray.push(dataSkill[i].name)
                    } else if (dataSkill[i].parent===17) {
                        devArray.push(dataSkill[i].name)
                    }
                }
                setSkillDataFront(frontArray)
                setSkillDataBack(backArray)
                setSkillDataDev(devArray)
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    // Skill tab
    const [sortTab,setsortTab] = useState('front')
    const filterSkills = (filterType) => {
        setsortTab(filterType);
    }


    return (
        <>
        { 
        isLoaded ?
            <>
            <Helmet>
                <title>{restData.yoast_head_json.title}</title>
                <meta name="description" content={restData.yoast_head_json.description}/>
            </Helmet>
            <div className='page-wrapper about-wrapper'>
                <article id={`post-${restData.id}`}>
                    <div className='content-paragraph'>
                    <h1>{restData.acf.title}</h1>
                    <p>{restData.acf.description}</p>
                    </div>
                    <div className='content-skills'>
                        <h2>My Toolkit</h2>
                        <div className='sortbtn'>
                            <button 
                            className={sortTab ==='front' ? 'active' : null}
                            onClick={() => filterSkills('front')}>
                                <FontAwesomeIcon icon={faLaptopCode} size="lg"/>
                                <div>Front-End</div>
                            </button>
                            <button 
                            className={sortTab ==='back' ? 'active' : null}
                            onClick={() => filterSkills('back')}>
                                <FontAwesomeIcon icon={faServer} size="lg"/>
                                <div>Back-End</div>
                            </button>
                            <button 
                            className={sortTab ==='dev' ? 'active' : null}
                            onClick={() => filterSkills('dev')}>
                                <FontAwesomeIcon icon={faScrewdriverWrench} size="lg"/>
                                <div>Dev</div>
                            </button>
                        </div>
                        <ul className='skills'>
                            {restSkillDataFront?.map((oneSkill, i) =>
                                <li key={i} className={sortTab ==='front' ? 'sort-f active' : 'sort-f'}>{oneSkill}</li>
                            )}
                            {restSkillDataBack?.map((oneSkill, i) =>
                                <li key={i} className={sortTab ==='back' ? 'sort-b active' : ' sort-b'}>{oneSkill}</li>
                            )}
                            {restSkillDataDev?.map((oneSkill, i) =>
                                <li key={i} className={sortTab ==='dev' ? 'sort-d active' : 'sort-d'}>{oneSkill}</li>
                            )}
                        </ul>
                    </div>
                </article>
            </div>
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default About
