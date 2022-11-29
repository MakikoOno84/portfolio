import { useEffect } from "react";
const ReturnToTop = () => {

    // return (
    //     <div className='page-link'>
    //         <a href="#page-top" className='return-top line-animation'>Return to Top</a>
    //     </div>
    // )
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    
      return (
        <>
          {/* <h2>Top of the page</h2> */}
    
          {/* <div style={{height: '155rem'}} /> */}
    
          {/* 👇️ scroll to top on button click */}
          <button
            onClick={() => {
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}
            className='page-link returntotop line-animation'
            // style={{
            //   position: 'fixed',
            //   padding: '1rem 2rem',
            //   fontSize: '20px',
            //   bottom: '40px',
            //   right: '40px',
            //   backgroundColor: '#0C9',
            //   color: '#fff',
            //   textAlign: 'center',
            // }}
          >
            Return to top
          </button>
        </>
      )
}

export default ReturnToTop