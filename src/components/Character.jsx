import AttributeList from './AttributeList';

const Character = ({ character }) => {

    return (
        <div>
            <AttributeList characterId={character.id} />
        </div>
    );
};

export default Character;
