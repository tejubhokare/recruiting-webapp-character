import AttributeList from './AttributeList';
import ClassList from './ClassList';
import SkillList from './SkillList';
import '../styles/Character.css';
const Character = ({ character }) => {
    return (
        <div className='mainDivChar'>
            <AttributeList characterId={character.id} />
            <ClassList characterId={character.id} />
            <SkillList characterId={character.id} />
        </div>
    );
};

export default Character;
