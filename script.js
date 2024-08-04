const searchInput = document.getElementById('search-input');
const pokeName = document.getElementById('pokemon-name');
const pokeId = document.getElementById('pokemon-id')
const searchBtn = document.getElementById('search-button');
const pokeWeight = document.getElementById('weight');
const pokeHeight = document.getElementById('height');
const pokeAttack = document.getElementById('attack');
const pokeDefense = document.getElementById('defense');
const pokeHp = document.getElementById('hp');
const pokeSpecialAttack = document.getElementById('special-attack');
const pokeSpecialDefense = document.getElementById('special-defense');
const pokeSpeed = document.getElementById('speed');
const pokeImageContainer = document.getElementById('image-container');
const pokeTypeDisplay = document.getElementById('type-display');
const randomBtn = document.getElementById('random-poke')
const pokeListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

let currentIntervalId;


const fetchPokemon = async () => {
    const pokemon = searchInput.value.toLowerCase();
    try{
        const listTest = await fetch(`${pokeListUrl + `/${pokemon}`}`);
        const pokeList = await listTest.json();
        resetPokeDexDisplay();
        pokeDex(pokeList)
    } catch (err){
        alert("Pokémon not found")
        console.log(err);
    }
};


const pokeDex = (list) => {
    const {name, id, height, weight, types, stats} = list;
    pokeId.innerText = `#${id}`;
    pokeName.innerText = `${name.toUpperCase()}`;
    pokeWeight.innerText = `Weight: ${weight}`;
    pokeHeight.innerText = `Height: ${height}`;
    displayImages(0, list);
    types.forEach((el) => {
        let type = el.type.name
        pokeTypeDisplay.innerHTML += `<span class="types ${type}">${type.toUpperCase()}</span>`
    } );
    pokeHp.textContent = stats[0].base_stat;
    pokeAttack.textContent = stats[1].base_stat;
    pokeDefense.textContent = stats[2].base_stat;
    pokeSpecialAttack.textContent = stats[3].base_stat;
    pokeSpecialDefense.textContent = stats[4].base_stat;
    pokeSpeed.textContent = stats[5 ].base_stat;
   
}; 

const displayImages = (index, list) => {
    if (currentIntervalId) {
        clearTimeout(currentIntervalId);
    }

    const {sprites, name} = list
    const imagesArr = [
        sprites.front_default,
        sprites.back_default,
        // sprites.front_female,
        // sprites.back_female,
        sprites.front_shiny,
        sprites.back_shiny
    ]

    if (index >= imagesArr.length){
        index = 0;
    }
    pokeImageContainer.innerHTML = `<img src="${imagesArr[index]}" alt="${name}" id="poke-img"/>`;
    currentIntervalId = setTimeout(() => {
        pokeImageContainer.innerHTML = ``;
        displayImages(index + 1, list)
    }, 1000);
}

const resetPokeDexDisplay = () => {
    pokeId.innerText =``;
    pokeAttack.innerText = ``;
    pokeSpecialAttack.innerText = ``;
    pokeDefense.innerText = ``;
    pokeSpecialDefense.innerText = ``;
    pokeSpeed.innerText = ``;
    pokeName.innerText = ``;
    pokeImageContainer.innerHTML = ``;
    pokeHp.innerText = ``;
    pokeWeight.innerText = ``;
    pokeHeight.innerText =``;
    pokeTypeDisplay.innerText =``;
}
searchBtn.addEventListener('click', (e) =>{
    fetchPokemon();
});

const randomPokemon = async () => {
    try{
        const listTest = await fetch(`${pokeListUrl}`);
        const pokeList2 = await listTest.json();
        const validPoke = pokeList2.results.map((el) => el.name);
        const randomIndex = Math.floor(Math.random() * validPoke.length);
        searchInput.innerText =``
        searchInput.value = `${validPoke[randomIndex]}`
        fetchPokemon();
    } catch (err){
        alert("Pokémon List could not be Fetched")
        console.log(err);
    
}}

searchInput.addEventListener('keydown', (e) =>{
    if (e.key === 'Enter'){
        fetchPokemon();
    }
});

randomBtn.addEventListener('click', randomPokemon)



