import React from 'react';
import { IMG_DETAIL_URL } from './config';

const synth = window.speechSynthesis;

function Details({ details }) {
    const utterThis = new SpeechSynthesisUtterance(details.name);
    return (
        <div className="Details">
            <div className={`${details.types[0].type.name}`}>
                <img alt={details.name} className="img" src={`${IMG_DETAIL_URL}/${details.id}.png`} />
                <p className="name" onClick={() => { synth.speak(utterThis); }}>{details.name}</p>
                <div className="types">
                    {details.types.map((type) => (
                        <span key={type.type.name} className={`type ${type.type.name}`}>⬤</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Details;