import React, { useState, useContext } from 'react';
import '../styles/ClassList.css';
import { CharacterContext } from '../contexts/CharacterContext';
import { CLASS_LIST } from '../consts';

const ClassList = ({ characterId }) => {
    const { characters } = useContext(CharacterContext);
    const character = characters.find(char => char.id === characterId);
    const [selectedClass, setSelectedClass] = useState();

    if (!character) {
        return null;
    }

    const displayClassDetails = (classname) => {
        for (let cls in CLASS_LIST) {
            if (cls === classname) {
                setSelectedClass(cls);
            }
        }
    };

    return (
        <div className='mainDivCls'>
            <div className='subDiv'>
                <h2>Classes</h2>
                {Object.keys(CLASS_LIST).map(classname => (
                    <div key={classname} onClick={() => displayClassDetails(classname)}
                        style={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: character.highlightedClass.includes(classname) ? 'red' : 'white',
                            marginBottom: '10px'
                        }}>
                        {classname}
                    </div>
                ))}
            </div>

            {selectedClass && (
                <div className='selectedClsDiv'>
                    <h2>{selectedClass} minimum requirements</h2>
                    {Object.entries(CLASS_LIST[selectedClass]).map(([attr, value]) => (
                        <p key={attr}>
                            {attr}: {value}
                        </p>
                    ))}
                    <button className='closebutton' onClick={() => setSelectedClass(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ClassList;
