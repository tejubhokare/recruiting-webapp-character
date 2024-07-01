import React, { useContext, useEffect } from 'react';
import '../styles/CharactersContainer.css';
import Character from './Character';
import { saveAllCharacter, loadCharacterData } from "../api/character";
import { CharacterContext } from '../contexts/CharacterContext';

const CharactersContainer = () => {
    const { characters, addCharacter, setCharactersFromApi, setCharacters } = useContext(CharacterContext);

    useEffect(() => {
        loadCharacterData()
            .then(data => {
                if (data.statusCode === 200) {
                    setCharactersFromApi(data.body);
                }
            })
            .catch(error => alert(`Error occurred while retrieving data from API: ${error.message}`));
    }, []);

    const resetCharacter = () => {
        setCharacters([]);
    };

    return (
        <div>
            <div>
                <button className="buttonStyle" onClick={addCharacter}>Add New Character</button>
                <button className="buttonStyle" onClick={resetCharacter}>Reset All Characters</button>
                <button className="buttonStyle" onClick={() => saveAllCharacter(characters)}>Save All Characters</button>
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
