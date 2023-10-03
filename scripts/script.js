var listaUrlImgPokemon = []

function obterUrlImagemPokemon(nomePokemon, id) {
  // Fazendo uma chamada à API para obter os dados do Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon.toLowerCase()}`)
      .then(response => response.json())
      .then(dadosPokemon => {
          // Obtendo o ID do Pokémon para fazer outra chamada à API para obter os detalhes da espécie
          const idPokemon = dadosPokemon.id;
          // console.log(dadosPokemon.sprites.front_default)
          listaUrlImgPokemon.push(dadosPokemon.sprites.front_default)
          // let y = `poke${id}`
          // console.log(x)
          // let x = document.getElementById('poke1')
          // x.setAttribute('src', dadosPokemon.sprites.front_default)
          // return dadosPokemon.sprites.front_default
      })
      .catch(error => console.error('Erro ao obter dados do Pokémon:', error));
}

function obterListaAleatoriaPokemon(numeroPokemon) {
  // Gerar um número aleatório para o offset
  const offset = Math.floor(Math.random() * 800); // Existem aproximadamente 800 Pokémon na PokeAPI

  // Fazendo uma chamada à API para obter a lista aleatória de Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numeroPokemon}&offset=${offset}`)
      .then(response => response.json())
      .then(dados => {
          const listaPokemon = dados.results;
          
          console.log('Lista aleatória de Pokémon:');
          numeroPokemon++
          listaPokemon.forEach(pokemon => {
          //   numeroPokemon--
          // console.warn(numeroPokemon)
            obterUrlImagemPokemon(pokemon.name, numeroPokemon)
          });
      })
      .catch(error => console.error('Erro ao obter lista de Pokémon:', error));
}

// Exemplo de uso da função
// const nomePokemon = prompt('Digite o nome do Pokémon:');
obterListaAleatoriaPokemon(30);
// obterUrlImagemPokemon(nomePokemon);
console.warn(listaUrlImgPokemon)



//array de pecas para sorteio e verificação de lógica
var pecas = [];
//array de elementos HTML (peça)
var pecasHTML =[];
//variavel para guardar o primeiro chute
var z = null;
//variavel para guardar o segundo chute
var y = null;
//funçao para criação das peças - realizar 

let nivel = document.getElementById("nivel");
nivel.addEventListener('change', teste);
function teste(){
  if(nivel.value == "medio"){
    criarTabuleiro(4,5);
  }else if(nivel.value == "facil"){
    criarTabuleiro(2,5);
  }else if(nivel.value == "dificil"){
    criarTabuleiro(6,5);
  }
}
function criarTabuleiro(linhas, pecas){
  let tabela = document.getElementById("tabela");
  if(tabela.childElementCount<=0){
      let contador = 0;
      for(let i = 0;i<linhas;i++){
      let linha = document.createElement("tr");
      for(let z = 0;z<pecas;z++){
        let peca = document.createElement("td");
        peca.innerHTML = "X";
        peca.setAttribute("class", "peca");
        peca.setAttribute("id", contador);
        peca.setAttribute("onclick", "mostrarPeca(this)");
        contador+=1;
        linha.appendChild(peca);
      }
      tabela.appendChild(linha);
    }
  }else{
    tabela.innerText = "";
    criarTabuleiro(linhas, pecas);
  }
  criarPecas(linhas*pecas);
}
function criarPecas(n){
  let x = 1;
  for(var i=0;i<n-1;i+=2){
    pecas[i] = listaUrlImgPokemon[x];
    pecas[i+1] = listaUrlImgPokemon[x];
    x+=1;
  }
  for(var i=0;i<n-1;i++){
    pecasHTML[i] = document.getElementById(i);
    let pecaImgPokemon = document.createElement('img')
    // pecaImgPokemon.setAttribute('src', listaUrlImgPokemon[i])
    // console.log(pecaImgPokemon)
    pecasHTML[i].appendChild(pecaImgPokemon)
  }
  shuffle(pecas);
}

//criarPecas();

function mostrarPeca(x){
  if(!z && !y){
    // x.innerHTML = pecas[x.id];
    x.innerHTML = ''
    let pecaImgPokemon = document.createElement('img')
    pecaImgPokemon.setAttribute('src', pecas[x.id])
    x.appendChild(pecaImgPokemon)
    // console.log(x)
    z = x;
  }else if(z){
    // x.innerHTML = pecas[x.id];
    x.innerHTML = ''
    let pecaImgPokemon = document.createElement('img')
    pecaImgPokemon.setAttribute('src', pecas[x.id])
    x.appendChild(pecaImgPokemon)
    y = x;
    if(pecas[z.id] == pecas[y.id] && z != y){
      let peca1 = document.getElementById(z.id);
      let peca2 = document.getElementById(y.id);
      peca1.onclick ="";
      peca2.onclick ="";
      z = null;
      y = null;
    }else{
      let peca1 = document.getElementById(z.id);
      let peca2 = document.getElementById(y.id);
      setTimeout(function(){
        peca1.innerHTML = "X";
        peca2.innerHTML = "X";
      },800);
      z = null;
      y = null;
    }
  }
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}