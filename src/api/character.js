const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{tejubhokare}/character/';

export const saveAllCharacter = async (data) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`An error occurred while saving characters - API: ${errorMessage}`);
        }

        alert("Characters saved successfully!");
    } catch (error) {
        alert(`Error occurred while saving characters: ${error.message}`);
    }
};

export const loadCharacterData = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`An error occurred while loading characters: ${errorMessage}`);
        }
        return await response.json();

    } catch (error) {
        console.error('Load characters error:', error);
        throw error;
    }
};