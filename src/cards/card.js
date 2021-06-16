import React from 'react';
import typeColors from '../types/types'
import './style.css';

function Card({ pokemon }) {
    return (
        <div className="card">
            <div className="card-icon">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="card-name">
                {pokemon.name}
            </div>
            <div className="card-types">
                {
                    pokemon.types.map(type => {
                        return (
                            <div className="card-type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="card-info">
                <div>
                    <p className="title">Base experience</p>
                    <p>{pokemon.base_experience}</p>
                </div>
                <div>
                <div>
                    <p className="title">Height</p>
                    <p>{pokemon.height}</p>
                </div>
                    <p className="title">Weight</p>
                    <p>{pokemon.weight}</p>
                </div>
                
            </div>
        </div>
    );
}

export default Card;