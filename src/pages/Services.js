import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
// Create a new Component and import it here
// In the new Component, output all of the Service posts
// Hint: Check Posts.js for a similar example of outputting multiple posts

const Services = () => {
    const restPath = ''
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
            <article id={`post-${restData.id}`}>
                <h1>{restData.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                </div>
                {/* Call the new Component here */}
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Services
