let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");
let numeros = document.querySelector(".d-1-3");

let etapaAtual = 0;
let numeroClique = "";
let votoBranco = false;
let votos = []

function comecarEtapa() {
  let etapa = etapas[etapaAtual]; //indice do objeto

  let numerosHtml = "";
  numeroClique = "";

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numerosHtml += "<div class='numero pisca'></div> "; // adiciona o pisca
    } else {
      numerosHtml += "<div class='numero'></div> ";
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numerosHtml; //div  pai quadrado dos numeros
}
function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter((item) => {
    if (item.numero === numeroClique) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
    let fotosHTML = "";
    for (let i in candidato.fotos) {
      if (candidato.fotos[i].small) {
       fotosHTML += `<div class="d-1-image small"><img src="${candidato.fotos[i].url}"alt="">${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHTML += `<div class="d-1-image"><img src="${candidato.fotos[i].url}"alt="">${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHTML;
  } else {
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    descricao.innerHTML = '<div class="aviso--grande pisca">voto nulo</div>';
  }
}

function clicou(n) {
  let numero = document.querySelector(".numero.pisca");
  if (numero !== null) {
    // se o quadrado tiver pisca então
    numero.innerHTML = n;
    numeroClique = `${numeroClique}${n}`;

    numero.classList.remove("pisca");
    if (numero.nextElementSibling !== null) {
      //se tiver um próximo item adicione a classe pisca
      numero.nextElementSibling.classList.add("pisca");
    } else {
      atualizaInterface();
    }
  }
}
function branco() {
  votoBranco = true;
  lateral.innerHTML = "";
  seuVotoPara.style.display = "block";
  aviso.style.display = "block";
  numeros.innerHTML = "";
  descricao.innerHTML =
    '<div class="aviso--grande pisca">VOTO EM</br> BRANCO</div>';
}
function corrige() {
  comecarEtapa();
}
function confirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;
  if (votoBranco === true) {
    votos.push({etapa:etapas[etapaAtual].titulo, voto:'branco'})
    votoConfirmado = true;
    console.log("voto em branco confirmado");
  } else if (numeroClique.length === etapa.numeros) {
    votos.push({etapa:etapas[etapaAtual].titulo, voto:numeroClique})
    votoConfirmado = true;
  }
  
  if (votoConfirmado) {
    etapaAtual++;
    if (etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
         document.querySelector(".tela").innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
         console.log(votos)
    }
  }
}

comecarEtapa();
//comentario
