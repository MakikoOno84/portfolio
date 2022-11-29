import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

const Contact = () => {
    const restPath = 'https://makiko.dev/mindset/wp-json/wp/v2/pages/5'
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
                <p>{restData.acf.address}<br/>
                {restData.acf.email}</p>
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Contact
