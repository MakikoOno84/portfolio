import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState } from 'react'
import syntaxTheme from '../global/syntaxTheme';

function HighlightCode({ code }) {
    const [codeOpen, setCodeOpen] = useState(false);

    function handleCodeContent() {
        setCodeOpen(!codeOpen);
    }

    return (

        <div className={`code-content ${codeOpen ? 'open' : 'close'}`}>
            <SyntaxHighlighter
                language='javascript'
                style={syntaxTheme}
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