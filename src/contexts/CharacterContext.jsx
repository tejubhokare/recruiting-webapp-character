import React, { createContext, useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST } from '../consts';

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
        highlightedClass: []
    });

    const addCharacter = () => {
        setCharacters([...characters, createNewCharacter()]);
    };

    const incrementAttribute = (id, attr) => {
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    const newAttributes = { ...char.attributes, [attr]: char.attributes[attr] + 1 };
                    displayClass(id, newAttributes);
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
                    displayClass(id, newAttributes);
                    return { ...char, attributes: newAttributes };
                }
                return char;
            })
        );
    };

    const displayClass = (id, newAttributes) => {
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    let matches = [];
                    for (let classname in CLASS_LIST) {
                        const classMatch = CLASS_LIST[classname];
                        let isMatch = true;
                        for (const attr in newAttributes) {
                            if (newAttributes[attr] < classMatch[attr]) {
                                isMatch = false;
                                break;
                            }
                        }
                        if (isMatch) {
                            matches.push(classname);
                        }
                    }
                    return { ...char, highlightedClass: matches };
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
                displayClass,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export { CharacterProvider, CharacterContext };
