import React, { createContext, useState } from 'react';
import { ATTRIBUTE_LIST } from '../consts';

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {

    const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
        acc[attr] = 10;
        return acc;
    }, {});

    const [characters, setCharacters] = useState([]);

    const createNewCharacter = () => ({
        id: characters.length + 1,
        attributes: initialAttributes,
    });

    const addCharacter = () => {
        setCharacters([...characters, createNewCharacter()]);
    };

    const incrementAttribute = (id, attr) => {
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    const newAttributes = { ...char.attributes, [attr]: char.attributes[attr] + 1 };
                    return { ...char, attributes: newAttributes };
                }
                return char;
            })
        );
    };

    const decrementAttribute = (id, attr) => {
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    const newAttributes = { ...char.attributes, [attr]: char.attributes[attr] - 1 };
                    return { ...char, attributes: newAttributes };
                }
                return char;
            })
        );
    };


    return (
        <CharacterContext.Provider
            value={{
                characters,
                addCharacter,
                incrementAttribute,
                decrementAttribute,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export { CharacterProvider, CharacterContext };
