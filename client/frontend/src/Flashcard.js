import React, {useState, useEffect, useRef} from 'react'

export default function Flashcard({flashcard}) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')
    const frontEl = useRef();
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }
    function handleEdit(e) {
        e.preventDefault();
    }
    function handleDelete(e) {
        e.preventDefault();
    }
    useEffect(() => {
        setMaxHeight();
    }, [flashcard.question, flashcard.answer, flashcard.options]);
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])
    return (
        <div className={`card ${flip ? 'flip' : ''}`} onClick={()=> setFlip(!flip)}
        style={{height: height}}>
            <div className="item front" ref={frontEl}>
                {flashcard.question}
                <div className="item" hidden={flashcard.status === true}>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div className="item flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option" key={option}>{option}</div>
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashcard.answer}</div>
            {/*{flip ? flashcard.answer : flashcard.question}*/}
        </div>
    )
}