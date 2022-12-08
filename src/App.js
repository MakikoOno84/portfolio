import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Sidebar from './components/Sidebar'
import WorkDetail from './pages/WorkDetail'
import Experience from './pages/Experience'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
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
          <header id="masthead" className='site-header1'>
                    <nav className="site-navigation1">
                      <Nav />
                    </nav>

          </header>
          <NavMobile/>
          <main id="main" className='site-main'>
            <ScrollToTop/>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/works' element={<Works />} />
              <Route path='/workdetail/:id' element={<WorkDetail />} />
              <Route path='/experience' element={<Experience />} />
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
