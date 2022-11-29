import SyntaxHighlighter from "react-syntax-highlighter";
import { useState } from 'react'
import { dark }from 'react-syntax-highlighter/styles/hljs';


function HighlightCode({ code }) {
    const [codeOpen, setCodeOpen] = useState(false);

    function handleCodeContent() {
        setCodeOpen(!codeOpen);
    }

    return (

        <div className={`code-content ${codeOpen ? 'open' : 'close'}`}>
            <SyntaxHighlighter
                language='javascript'
                style={dark}
                showLineNumbers={true}
                wrapLines={true}>
                {code}
            </SyntaxHighlighter>
            <button className='code-button' onClick={handleCodeContent}>
                {codeOpen ? <span>Collapse Code</span> : <span>Expand Code</span>}
            </button>
        </div>

    );

}

export default HighlightCode