// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

async function getOnePokemon() {
  let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
  res.data.results.forEach((pokemon) => {
    console.log(pokemon.name);
  });
}
// getOnePokemon();

// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

async function getRandomPokemon() {
  let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
  let randomPokemon = [];
  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * res.data.results.length);
    let url = res.data.results.splice(random, 1)[0].url;
    randomPokemon.push(url);
  }
  const rand = await Promise.all(
    randomPokemon.map(async function (pokemonUrl) {
      const response = await axios.get(pokemonUrl);
      return response.data;
    })
  );
  rand.forEach((d) => console.log(d));
}

// getRandomPokemon();

// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

async function pokemonGame1() {
  let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
  let randomPokemon = [];
  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * res.data.results.length);
    let url = res.data.results.splice(random, 1)[0].url;
    randomPokemon.push(url);
  }
  const rand = await Promise.all(
    randomPokemon.map(async function (pokemonUrl) {
      const response = await axios.get(pokemonUrl);
      return response.data;
    })
  );
  let names = rand.map((d) => d.name);

  const species = await Promise.all(
    rand.map(async function (s) {
      const response = await axios.get(s.species.url);
      return response.data;
    })
  );
  let description = species.map((data) => {
    let obj = data.flavor_text_entries.find((entry) => {
      return entry.language.name === "en";
    });
    return obj ? obj.flavor_text : "None";
  });
  description.forEach((text, index) => {
    console.log(`"${names[index]} : ${text}"`);
  });
}

pokemonGame1();

// 4.BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

$("#btn").on("click", async function () {
  $("#card").empty();
  let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1500`);
  let randomPokemon = [];
  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * res.data.results.length);
    let url = res.data.results.splice(random, 1)[0].url;
    randomPokemon.push(url);
  }
  const rand = await Promise.all(
    randomPokemon.map(async function (pokemonUrl) {
      const response = await axios.get(pokemonUrl);
      return response.data;
    })
  );
  let names = rand.map((d) => ({
    name: d.name,
    src: d.sprites.front_default,
  }));

  const species = await Promise.all(
    rand.map(async function (s) {
      const response = await axios.get(s.species.url);
      return response.data;
    })
  );
  species.forEach((data, i) => {
    let obj = data.flavor_text_entries.find((entry) => {
      return entry.language.name === "en";
    });
    let description = obj ? obj.flavor_text : "";
    let { name, src } = names[i];
    $("#card").append(pokemon(name, src, description));
  });
});

function pokemon(name, src, description) {
  return `
  <div class="pokemon">
    <h1>${name}</h1>
    <img src=${src} />
    <p>${description}</p>
  </div>
`;
}
