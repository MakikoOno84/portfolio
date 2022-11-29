import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Posts = ( {featuredImage} ) => {
    const restPath = 'https://makiko.dev/mindset/wp-json/wp/v2/posts?_embed'
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
                <h1>Blog</h1>
                {restData.map(post => 
                    <article key={post.id} id={`post-${post.id}`}>
                        {post._embedded['wp:featuredmedia'][0] &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        <Link to={`/blog/${post.id}`}><h2>{post.title.rendered}</h2></Link>
                        <p>by: {post._embedded['author'][0].name}</p>
                        <div className="entry-content" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}}></div>
                    </article>
                )}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Posts
