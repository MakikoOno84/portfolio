import { useEffect } from "react";
const ReturnToTop = () => {

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    
      return (
        <>
          {/* scroll to top on button click */}
          <button
            onClick={() => {
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}
            className='page-link returntotop line-animation'
          >
            Return to top
          </button>
        </>
      )
}

export default ReturnToTop