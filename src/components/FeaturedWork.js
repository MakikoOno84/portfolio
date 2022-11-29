import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css"; 
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Skills from './Skills';
// import '../swiper/css/swiper-bundle.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import parse from 'html-react-parser'
import { featuredImage } from "../scripts/script";
const imageFolderPath = process.env.PUBLIC_URL

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
    /*React Slick
    https://react-slick.neostack.com/
     */ 

    const settings = {
        dots: true,
        arrows:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed:1000,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 5000
        // responsive: [
        //   {
        //     breakpoint: 1024,
        //     settings: {
        //       slidesToShow: 3,
        //       slidesToScroll: 3,
        //       infinite: true,
        //       dots: true
        //     }
        //   },
        //   {
        //     breakpoint: 600,
        //     settings: {
        //       slidesToShow: 2,
        //       slidesToScroll: 2,
        //       initialSlide: 2
        //     }
        //   },
        //   {
        //     breakpoint: 480,
        //     settings: {
        //       slidesToShow: 1,
        //       slidesToScroll: 1
        //     }
        //   }
        // ]
    };
  
    return (
        <>
        { isLoaded ?
            <>
            <h2>Featured Work</h2>
            {/* <Slider {...settings}> */}
            <div className="featured-work-wrapper">
                {restData?.map( cpost => 
                    <article key={cpost.id} id={`post-${cpost.id}`} className='work-item'>
                    {cpost._embedded['wp:featuredmedia'][0] &&
                        <Link to={`/workdetail/${cpost.id}`}
                        //   state= {{movie: oneContent, base_url: base_url}}
                        >
                            {/* <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(cpost._embedded['wp:featuredmedia'][0])}></figure> */}
                            {/* <img src={`${imageFolderPath}about_palceholder.jpeg`} alt="" /> */}
                            {/* {parse(cpost.content.rendered)} */}
                            {cpost._embedded['wp:featuredmedia'][0] &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(cpost._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        </Link>
                    }
                    <div className="work-content">
                        <h3>
                            <Link to={`/workdetail/${cpost.id}`}
                                    //   state= {{movie: oneContent, base_url: base_url}}
                                    >
                            {cpost.title.rendered}
                            </Link>
                        </h3>
                        <Skills skillArray={cpost['mopf-skill-category']} skillCategory="front-end"/>
                    </div>
                </article>
                )}
            </div>
            {/* </Slider> */}
            {/* <div style={{ textAlign: "center" }}>
                <button className="button" onClick={this.play}>
                    Play
                </button>
                <button className="button" onClick={this.pause}>
                    Pause
                </button>
            </div> */}

            </>
        : 
            <Loading />
        }
        </>   
    )
  
}

export default FeaturedWork