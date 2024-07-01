import React, { createContext, useState } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../consts';

const CharacterContext = createContext();

const CharacterProvider = ({ children }) => {

    const maxAttributePoints = 70;
    const initialAttributes = ATTRIBUTE_LIST.reduce((acc, attr) => {
        acc[attr] = 10;
        return acc;
    }, {});

    const initialSkills = SKILL_LIST.reduce((acc, skl) => {
        acc[skl.name] = {
            value: 0,
            attributeModifier: skl.attributeModifier,
        };
        return acc;
    }, {});

    const [characters, setCharacters] = useState([]);

    const createNewCharacter = () => ({
        id: characters.length + 1,
        attributes: initialAttributes,
        skills: initialSkills,
        modifiers: ATTRIBUTE_LIST.reduce((acc, attr) => {
            acc[attr] = Math.floor((initialAttributes[attr] - 10) / 2);
            return acc;
        }, {}),
        highlightedClass: []
    });

    const addCharacter = () => {
        setCharacters([...characters, createNewCharacter()]);
    };

    const calculateModifier = (attributeValue) => {
        return Math.floor((attributeValue - 10) / 2);
    };

    const incrementAttribute = (id, attr) => {
        const characterToUpdate = characters.find(char => char.id === id);
        let sum = 0;
        for (let val in characterToUpdate.attributes) {
            sum += characterToUpdate.attributes[val];
        }
        if (sum >= maxAttributePoints) {
            alert(`A character can have up to ${maxAttributePoints} delegated attribute points`);
            return;
        }
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    const newAttributes = { ...char.attributes, [attr]: char.attributes[attr] + 1 };
                    const newModifiers = { ...char.modifiers, [attr]: calculateModifier(newAttributes[attr]) };
                    displayClass(id, newAttributes);
                    return { ...char, attributes: newAttributes, modifiers: newModifiers };
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
                    const newModifiers = { ...char.modifiers, [attr]: calculateModifier(newAttributes[attr]) };
                    displayClass(id, newAttributes);
                    return { ...char, attributes: newAttributes, modifiers: newModifiers };
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

    const incrementSkill = (id, skill) => {
        const characterToUpdate = characters.find(char => char.id === id);
        let total = Object.values(characterToUpdate.skills).reduce((acc, skl) => acc + skl.value, 0);
        const TotalSkill = 10 + (4 * characterToUpdate.modifiers['Intelligence']);

        if (total >= TotalSkill) {
            alert("You need more skill points! Upgrade intelligence to get more");
            return
        }

        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {

                    const newSkills = { ...char.skills, [skill]: { ...char.skills[skill], value: char.skills[skill].value + 1 } };
                    return { ...char, skills: newSkills };
                }
                return char;
            })
        );
    };

    const decrementSkill = (id, skill) => {
        setCharacters(prevCharacters =>
            prevCharacters.map(char => {
                if (char.id === id) {
                    const newSkills = { ...char.skills, [skill]: { ...char.skills[skill], value: char.skills[skill].value - 1 } };
                    return { ...char, skills: newSkills };
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
                incrementSkill,
                decrementSkill,
                setCharacters,

            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export { CharacterProvider, CharacterContext };
