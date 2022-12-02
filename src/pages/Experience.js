import { useState, useRef,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Skills from '../components/Skills'
import parse from 'html-react-parser'
import Slider from "react-slick";
import ArrowLeft from '../images/arrow-left.svg'
import '../slick-theme.css'
import {HashLink} from 'react-router-hash-link'
// import ReturnToTop from '../components/ReturnToTop'

const Experience = () => {
    const restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-students'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
                /* Assume index 0 is the newest experience.
                */
                setActiveSlideDesktop(data[0].id)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

        // Swiper
        const [activeSlide,setActiveSlide] = useState(0)
        const [activeSlide2,setActiveSlide2] = useState(0)

        const settings = {
            dots: true,
            arrows:false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed:500,
            initialSlide: 0,
            autoplay: false,
            autoplaySpeed: 5000,
            centerPadding:"10px",
            beforeChange:(current,next) => setActiveSlide(next),
            afterChange:current => setActiveSlide2(current),
            // nextArrow:<NextArrow cname={'custom-next-arrow'}/>,
            // prevArrow:<NextArrow cname={'custom-prev-arrow'}/>
            // responsive: [
            //   {
            //     breakpoint: 600,
            //     settings: {
            //         swipe:false
            //     //     slidesToShow: 2,
            //     //   slidesToScroll: 2,
            //     //   initialSlide: 2
            //     }
            //   }
            // ]
        };


    const [enableSlick, setEnableSlick] = useState(false);
    const isDesktop = e => {
        if (e.matches === true) {
            setEnableSlick(false);
        } else {
            setEnableSlick(true);
        }
      };
  
      useEffect(() => {
          let mediaQuery = window.matchMedia('(min-width: 800px)');
          if (mediaQuery.matches === true) {
            setEnableSlick(false);
            } else {
                setEnableSlick(true);
            }
          mediaQuery.addEventListener('change', isDesktop);
          // this is the cleanup function to remove the listener
          return () => mediaQuery.removeEventListener('change', isDesktop);
        }, []);

    // manage active timeline on desktop
    const [activeSlideDesktop,setActiveSlideDesktop] = useState(0)
    function handleActiveSlideDesktop(id) {
        console.log('clicked!');
        // e.preventDefault();
        setActiveSlideDesktop(id);
    }
    // useEffect(() => {
    //     setActiveSlideDesktop(restData[0].id)
    // },[isLoaded]
    // )
    return (
        <>
        { isLoaded ? 
            <>
            <div className='page-wrapper experience-wrapper'>
                <h1>Experience</h1>
                <section className='experience-timeline'>
                    {enableSlick ? 
                        <Slider {...settings}>
                        {restData?.map( (cpost, idx) =>
                            <button key={idx}>
                                {cpost.title.rendered}<br/>
                                {cpost.acf.period}
                            </button>
                        )}
                        </Slider>
                        :
                        <>
                        {restData?.map( (cpost, idx) =>
                            <div key={idx} className={`timeline ${activeSlideDesktop === cpost.id && 'active'}`}>
                                <HashLink 
                                    to={"#" + `experience-${cpost.id}`}
                                    onClick={(e) => {
                                        // e.preventDefault();
                                        handleActiveSlideDesktop(cpost.id);
                                    }}
                                >
                                <span>{cpost.title.rendered}</span>
                                <span>{cpost.acf.period}</span>
                                </HashLink>
                            </div>
                        )}
                        </>
                    }
                </section>
                <section className='experience-content'>
                    { enableSlick ? 
                    <>
                        {parse(restData[activeSlide2].acf.description)} 
                    </>
                    :
                    <>
                        {restData?.map( cpost => 
                            <article key={cpost.id} id={`experience-${cpost.id}`} className='experience-content-item'>
                            <h2>{cpost.acf.role}@{cpost.title.rendered}</h2>
                            <p>{cpost.acf.period}</p>
                            {parse(cpost.acf.description)}
                        </article>
                        )}
                    </>
                    }
                </section>

                {/* <ReturnToTop/> */}
            </div>
            </>
         : <Loading />
            
        }
        </>
    )
}

export default Experience
