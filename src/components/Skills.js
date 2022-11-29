import { useState, useEffect } from 'react'

const Skills = ({skillArray,skillCategory}) => {
    let restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-skill-category'

    if (skillCategory==='front-end') {
        restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-skill-category?parent=3'
    } else if (skillCategory==='back-end') {
        restPath = 'https://makiko.dev/webportfolio/wp-json/wp/v2/mopf-skill-category?parent=13'
    }

    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                // filter
                let matchedSkillArray = [];
                if (skillArray.length > 0) {
                    for (let i=0 ; i < skillArray.length ; i++) {
                        for (let j=0 ; j < data.length ; j++) {
                            if ( skillArray[i] === data[j].id ) {
                                matchedSkillArray.push(data[j].name);
                                break;
                            }
                        }
                    }
                }
        
                setData(matchedSkillArray)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    // function filterSkill() {
    //     let matchedSkillArray = [];
    //     if (skillArray.length > 0) {
    //         for (let i=0 ; i < skillArray.length ; i++) {
    //             for (let j=0 ; j < restData.length ; j++) {
    //                 if ( skillArray[i] === restData[j].id ) {
    //                     matchedSkillArray.push(restData[j].name);
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     return matchedSkillArray;
    // }

    return (
        <>
        { isLoaded &&
            <div className='content-skills'>
                <ul>
                    {restData.map((item,i) => 
                        <li key={i}>
                            {item}
                        </li>
                    )}
                </ul>
            </div>
        }
        </>

    )

}

export default Skills