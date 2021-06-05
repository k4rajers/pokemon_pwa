const pokemonList = document.querySelector("#pokemonList");
const pokemonCard = document.querySelector("#pokemonCard");
const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/"

window.addEventListener("load", (e) => {
    getPokemonList().then( () => {
        showPokemonCard(defaultPokemon);
    });

    pokemonList.addEventListener("change", (e) => {
        showPokemonCard(e.target.value);
    });

    registerServiceWorker();
})

async function getPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=35");
    const json = await response.json();

    pokemonList.innerHTML = json.results.map(
        (result) => `<option value="${result.url}">${result.name}</option>`
    )
}

async function showPokemonCard(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        pokemonCard.innerHTML = createCard(json);
    } catch (error) {
        console.log("Network unavailable.");
        pokemonCard.innerHTML = offlineCard();
    }
}

function offlineCard() {
    return `
        <div class="card-header">
            <p>Network is unavailable</p>
        </div>
    `;
}

function createCard(pokemon) {
    return `
    <div class="card-header mb-3" style="text-transform: capitalize;">
        <b><h2>#${pokemon.id}</h2></b>
    </div>
    <img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top mb-3" width="150" height="150" alt="${pokemon.name}">
    <div class="card-body">
        <h3 class="card-title" style="text-transform: capitalize;">${pokemon.name}</h3>
        <span class="badge bg-warning" style="color: black;">Height: ${pokemon.height}</span>
        <span class="badge bg-danger">Weight: ${pokemon.weight}</span> 
    </div>
    </div>
    `;
}

async function registerServiceWorker() {
    // await navigator.serviceWorker.register("sw.js");
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("sw.js");
        } catch (error) {
            console.log("Failed: ", error);
        }
    } else {
        console.log(navigator)
    }
}