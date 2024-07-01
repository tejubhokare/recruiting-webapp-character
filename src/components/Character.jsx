import React, { useState } from 'react';
import '../styles/Character.css';
import AttributeList from './AttributeList';
import ClassList from './ClassList';
import SkillList from './SkillList';

const Character = ({ character }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [DcValue, setDcValue] = useState();
    const [rollValue, setRollValue] = useState(null);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleInput = (event) => {
        setDcValue(event.target.value);
    };

    const handleRoll = () => {
        const dc = Number(DcValue);
        if (isNaN(dc) || dc < 1 || dc > 20) {
            alert("Please enter a valid DC value between 1 and 20.");
            return;
        }

        const newRollValue = Math.floor(Math.random() * dc) + 1;
        setRollValue(newRollValue);
    };

    let selectedSkillValue;
    if (selectedOption !== "") {
        selectedSkillValue = character.skills[selectedOption].value + character.modifiers[character.skills[selectedOption].attributeModifier]
    }

    return (
        <div>
            <h1>Skill Check Result</h1>
            <h3>Character: {character.id}</h3>
            <p>Skill: {selectedOption} : {selectedOption ? selectedSkillValue : "0"} </p>
            <p>You Rolled: {rollValue !== null ? rollValue : 'No roll yet'}</p>
            <p>The DC was: {DcValue}</p>
            <p>
                Result : {rollValue !== null ? (rollValue + selectedSkillValue >= DcValue ? "Success" : "Failure") : ""}
            </p>
            <div className='mainDivChar'>
                <h1 className='h1'>Character {character.id}</h1>
                <h2 className='h2'>Skill Check</h2>
                <label htmlFor="options">Skill:</label>
                <select id="options" value={selectedOption} onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    {Object.keys(character.skills).map((attr) => (
                        <option key={attr} value={attr}>{attr}</option>
                    ))}
                </select>
                <label className='labelDC' htmlFor="options">DC:</label>
                <input type='number' value={DcValue} onChange={handleInput} />
                <button onClick={handleRoll} className='buttonRoll'>Roll</button>
                <AttributeList characterId={character.id} />
                <ClassList characterId={character.id} />
                <SkillList characterId={character.id} />
            </div>
        </div>
    );
};

export default Character;
