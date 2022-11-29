import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './components/Posts'
import Post from './components/Post'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Works from './pages/Works'
import Sidebar from './components/Sidebar'
import Bottombar from './components/Bottombar'
import WorkDetail from './pages/WorkDetail'
import Experience from './pages/Experience'
import Nav from './components/Nav'
import {ReactComponent as HamburgerIcon } from "./images/hamburger.svg"
import {ReactComponent as HamburgerIcon2 } from "./images/hamburger2.svg"
import ScrollToTop from './components/ScrollToTop'
// import FeaturedWok from './components/FeaturedWok'
import NavMobile from './components/NavMobile'
import Helmet from 'react-helmet'
import PageNotFound from './pages/PageNotFound'

function App() {
  
  return (
      <Router basename="/">
        <Helmet>
                <title>Makiko Ono | Front End Developer &amp; Back End Engineer</title>
                <meta name="description" content='This is a web portfolio of Makiko Ono.'/>
          </Helmet>
        <div className='site'>
          {/* <header id="masthead" className="site-header"> */}
          <header id="masthead" className='site-header1'>
                    <nav className="site-navigation1">
                      <Nav />
                    </nav>

          </header>
          <NavMobile/>
          {/* <Bottombar /> */}
          <main id="main" className='site-main'>
            <ScrollToTop/>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              {/* <Route path='/blog' element={<Posts featuredImage={featuredImage} />} />
              <Route path='/blog/:id' element={<Post featuredImage={featuredImage}/>} />
              <Route path='/services' element={<Services />} />
              <Route path='/contact' element={<Contact />} /> */}
              <Route path='/works' element={<Works />} />
              <Route path='/workdetail/:id' element={<WorkDetail />} />
              <Route path='/experience' element={<Experience />} />
              {/* <Route path='/featuredwork' element={<FeaturedWok featuredImage={featuredImage}/>} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <footer className='site-footer'>
            <p className="copyright">Created by <a href="https://www.linkedin.com/in/makiko-ono-b38abb232/">Makiko Ono</a>.</p>
          </footer>
        </div>
      </Router>
  );
}

export default App;
