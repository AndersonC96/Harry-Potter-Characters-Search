const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = hpCharacters.filter((character) => {
        return(
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});
const loadCharacters = async () => {
    try{
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    }catch (err){
        console.error(err);
    }
};
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name} | ${character.actor}</h2>
                <p><b>House: </b>${character.house}</p>
                <p><b>Species: </b>${character.species} | <b>Gender: </b>${character.gender}</p>
                <p><b>Date of birth: </b>${character.dateOfBirth}</p>
                <p><b>Ancestry: </b>${character.ancestry}</p>
                <p><b>Hair colour: </b>${character.hairColour} | <b>Eye colour: </b>${character.eyeColour}</p>
                <p><b>Wand: </b><i><u>Wood</u></i> (${character.wand.wood}) | <i><u>Core</u></i> (${character.wand.core}) | <i><u>Lenght</u></i> (${character.wand.length})</p>
                <p><b>Patronus: </b>${character.patronus}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};
loadCharacters();