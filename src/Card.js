import React from 'react';
import { IMG_DETAIL_URL } from './config'
import './Card.css'

const synth = window.speechSynthesis;

function Card ({details}) {
    const utterThis = new SpeechSynthesisUtterance(details.name);
    return (
        <div className={`card ${details.types[0].type.name}`}>
            <div className="details">
                <div>
                    <p className="id">{`#${details.id}`}</p>
                    <p className="name" onClick={() => {synth.speak(utterThis);}}>{details.name}</p>
                    <div className="types">
                        {details.types.map((type) => (
                            <span key={type.type.name} className={`type ${type.type.name}`}>⬤</span>
                        ))}
                    </div>
                </div>
            </div>
            {details.id >= 10000 ? null : <img alt={details.name} className="img" src={`${IMG_DETAIL_URL}/${details.id}.png`} />}
        </div>
    );
}

export default Card;