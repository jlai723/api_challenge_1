const baseURL = 'https://pokeapi.co/api/v2/';

// SEARCH AREA
const searchBar = document.querySelector('#search');
const searchBtn = document.querySelector('.submit');

// RESULTS AREA
const section = document.querySelector('.card');

// EVENT LISTENER FOR SEARCH
searchBtn.addEventListener('click', getPokemon);

function getPokemon(e) {
    e.preventDefault();
    const userInput = document.querySelector('#search').value.toLowerCase();
    fetch(baseURL + "pokemon/" + userInput + "/")
        .then(res => res.json())
        .then(json => {
            let moves = json.abilities.map(move => `${move.ability.name} <br>`).join('');
            let diffTypes = json.types.map(diffType => `${diffType.type.name} <br>`).join('');
            let pokeObj =  {
                name: json.name,
                experience: json.base_experience,
                id: json.id,
                height: json.height,
                weight: json.weight,
                startingMoves: moves,
                icon: json.sprites.front_default,
                types: diffTypes
            }
            displayPokemon(pokeObj);
        })
        .catch(err => {
            displayError(err);
        });
}

function displayPokemon(pokeObj) {
    let pokeName = document.getElementById('name');
    pokeName.innerHTML = pokeObj.name;

    let pokeId = document.getElementById('id-number');
    pokeId.innerHTML = `Identification No. ${pokeObj.id}`;

    let pokeExp = document.getElementById('experience');
    pokeExp.innerHTML = `Base Experience Level: ${pokeObj.experience}`;

    let pokePhotoFront = document.getElementById('poke-photo-front');
    pokePhotoFront.src = pokeObj.icon;

    let pokePhotoBack = document.getElementById('poke-photo-back');
    pokePhotoBack.src = pokeObj.icon;

    let pokeHeight = document.getElementById('height');
    pokeHeight.innerHTML = `Height (in decimeters): ${pokeObj.height}`;

    let pokeWeight = document.getElementById('weight');
    pokeWeight.innerHTML = `Weight (in hectograms): ${pokeObj.weight}`;

    let pokeAbilities = document.getElementById('abilities');
    pokeAbilities.innerHTML = `Starting Move(s): <br> ${pokeObj.startingMoves.replaceAll("-", " ")}`;

    let pokeTypes = document.getElementById('types');
    pokeTypes.innerHTML = `Type(s): <br> ${pokeObj.types}`;
}

function displayError() {
    let errorMsg = document.getElementById('name');
    errorMsg.innerHTML = '';

    let pokeId = document.getElementById('id-number');
    pokeId.innerHTML = 'No Pokemon found :(';

    let pokeExp = document.getElementById('experience');
    pokeExp.innerHTML = 'No Pokemon found :(';

    let pokePhotoFront = document.getElementById('poke-photo-front');
    pokePhotoFront.src = '';

    let pokePhotoBack = document.getElementById('poke-photo-back');
    pokePhotoBack.src = '';

    let pokeHeight = document.getElementById('height');
    pokeHeight.innerHTML = '';

    let pokeWeight = document.getElementById('weight');
    pokeWeight.innerHTML = '';

    let pokeAbilities = document.getElementById('abilities');
    pokeAbilities.innerHTML = '';

    let pokeTypes = document.getElementById('types');
    pokeTypes.innerHTML = '';
}