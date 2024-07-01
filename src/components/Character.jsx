import AttributeList from './AttributeList';
import ClassList from './ClassList';
const Character = ({ character }) => {
    return (
        <div>
            <AttributeList characterId={character.id} />
            <ClassList characterId={character.id} />
        </div>
    );
};

export default Character;
