import React, { useContext } from 'react';
import '../styles/SkillList.css';
import { CharacterContext } from '../contexts/CharacterContext';

const SkillList = ({ characterId }) => {
    const { characters, incrementSkill, decrementSkill } = useContext(CharacterContext);
    const character = characters.find(char => char.id === characterId);

    if (!character) {
        return null;
    }

    const totalSkillPoints = 10 + (4 * character.modifiers['Intelligence']);

    return (
        <div className='mainDivSkill'>
            <h1>Skills</h1>
            <p>Total skill points available: {totalSkillPoints}</p>
            {Object.keys(character.skills).map((skill) => {
                const skillObj = character.skills[skill];
                return (
                    < div key={skill} style={{ marginBottom: '10px' }}>
                        <span>{skill}: {character.skills[skill].value}</span>
                        <span> (Modifier: {skillObj.attributeModifier}): {character.modifiers[skillObj.attributeModifier]}</span>
                        <button className='buttonIncrement' onClick={() => incrementSkill(character.id, skill)}>+</button>
                        <button className='buttonDecrement' onClick={() => decrementSkill(character.id, skill)}>-</button>
                        <span >total: {skillObj.value + character.modifiers[skillObj.attributeModifier]}</span>
                    </div>
                )

            })
            }
        </div >
    );
};

export default SkillList;
