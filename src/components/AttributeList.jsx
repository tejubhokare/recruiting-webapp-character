import React, { useContext } from 'react';
import '../styles/AttributeList.css';
import { CharacterContext } from '../contexts/CharacterContext';

const AttributeList = ({ characterId }) => {
    const { characters, incrementAttribute, decrementAttribute } = useContext(CharacterContext);
    const character = characters.find(char => char.id === characterId);

    if (!character) {
        return null;
    }

    return (
        <div className='mainDivAttr'>
            <h1>Attributes</h1>
            {Object.keys(character.attributes).map((attr) => (
                <div key={attr} style={{ marginBottom: '10px' }}>
                    <span>{attr}: {character.attributes[attr]}</span>
                    <button className='buttonIncrement1' onClick={() => incrementAttribute(character.id, attr)}>+</button>
                    <button className='buttonDecrement1' onClick={() => decrementAttribute(character.id, attr)}>-</button>
                </div>
            ))}
        </div>
    );
};

export default AttributeList;
