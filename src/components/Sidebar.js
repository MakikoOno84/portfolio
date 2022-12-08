import { useState, useEffect } from 'react'
import Loading from './Loading'
import parse from 'html-react-parser'

const Sidebar = () => {
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/pages/14'
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

    // format href if it's email
    function formatHref(slug,text) {
        if (slug === 'email') {
            text = 'mailto:' + text; 
        }
        return text;
    }

    return (
        <div className='sidebar-wrapper'>
        { 
        isLoaded ? 
        <ul>{
        restData.acf.sns_icons.map((icon, i) =>
        <li key={i} className={`sns-icon ${icon.link_slug}`}>
            <a href={formatHref(icon.link_slug,icon.link_text)} className={icon.link_slug} >{parse(icon.link_icon)}</a>
        </li>
        )}
        </ul>
        :
        <Loading />
        
        }
        </div>
        )
}

export default Sidebar