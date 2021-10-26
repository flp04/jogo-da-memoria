var pecas = [];
var pecasHTML =[];
var z = null;
var y = null;
function criarPecas(n = 20){
  let x = 1;
  for(var i=0;i<n-1;i+=2){
    pecas[i] = x;
    pecas[i+1] = x;
    x+=1;
  }
  for(var i=0;i<n-1;i++){
    pecasHTML[i] = document.getElementById(i);
  }
  shuffle(pecas);
}
criarPecas(10);
function mostrarPeca(x){
  if(!z && !y){
    x.innerHTML = pecas[x.id];
    z = x;
  }else if(z){
    x.innerHTML = pecas[x.id];
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