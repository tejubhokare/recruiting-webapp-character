import React, { useContext } from 'react';
import '../styles/CharactersContainer.css';
import Character from './Character';
import { CharacterContext } from '../contexts/CharacterContext';

const CharactersContainer = () => {
    const { characters, addCharacter } = useContext(CharacterContext);
    return (
        <div>
            <div>
                <button className="buttonStyle" onClick={addCharacter}>Add New Character</button>
            </div>

            {characters.map((character) => (
                <Character
                    key={character.id}
                    character={character}
                />
            ))}
        </div>
    );
};

export default CharactersContainer;
