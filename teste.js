function falar() {
  console.log("Olá!");
}

const objeto = {
  acao: falar
};

// Versão B
function filho({ acao }) {
  acao();
}

filho(objeto);