import React from 'react'
import Flashcard from "./Flashcard";

export default function FlashcardList( {flashcards, refreshCards} ) {
    return (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                if(flashcard.status !== undefined) {
                    return <Flashcard flashcard={flashcard} key={flashcard.id} refreshCards={refreshCards}/>    
                }
                else {
                    return <Flashcard flashcard={flashcard} key={flashcard.id}/>
                }
            })}
        </div>
    )
}