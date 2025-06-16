const pontos = [
    {
      id: 1,
      nome: "Bloco A",
      localizacao: "Pátio central",
      capacidade: 10,
      ocupacao: 3,
      iluminado: true,
      coberto: false
    },
    {
      id: 2,
      nome: "Biblioteca",
      localizacao: "Lado sul",
      capacidade: 8,
      ocupacao: 7,
      iluminado: true,
      coberto: true
    },
    {
      id: 3,
      nome: "Ginásio",
      localizacao: "Fundos do campus",
      capacidade: 5,
      ocupacao: 5,
      iluminado: false,
      coberto: false
    }
  ];
  
  const container = document.getElementById("pontos-container");
  const modal = document.getElementById("modal");
  const modalInfo = document.getElementById("modal-info");
  const fecharModal = document.getElementById("fechar-modal");
  
  function calcularEstado(ocupacao, capacidade) {
    const percentual = (ocupacao / capacidade) * 100;
    if (percentual < 50) return "disponivel";
    if (percentual < 90) return "quase-cheio";
    return "lotado";
  }
  
  function atualizarTela() {
    container.innerHTML = "";
    pontos.forEach((ponto, index) => {
      const div = document.createElement("div");
      div.classList.add("ponto");
  
      const estado = calcularEstado(ponto.ocupacao, ponto.capacidade);
  
      div.innerHTML = `
        <h2>${ponto.nome}</h2>
        <p><strong>Localização:</strong> ${ponto.localizacao}</p>
        <p><strong>Capacidade:</strong> ${ponto.capacidade}</p>
        <p><strong>Ocupação:</strong> <span>${ponto.ocupacao}</span></p>
        <p class="estado ${estado}">${estado.replace("-", " ")}</p>
        <button class="add" aria-label="Adicionar bicicleta">+</button>
        <button class="remove" aria-label="Remover bicicleta">−</button>
        <button class="detalhes" aria-label="Ver detalhes">Detalhes</button>
      `;
  
      const addBtn = div.querySelector(".add");
      const removeBtn = div.querySelector(".remove");
      const detalhesBtn = div.querySelector(".detalhes");
  
      addBtn.addEventListener("click", () => {
        if (ponto.ocupacao < ponto.capacidade) {
          ponto.ocupacao++;
          atualizarTela();
        }
      });
  
      removeBtn.addEventListener("click", () => {
        if (ponto.ocupacao > 0) {
          ponto.ocupacao--;
          atualizarTela();
        }
      });
  
      detalhesBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modalInfo.innerHTML = `
          <strong>Nome:</strong> ${ponto.nome}<br>
          <strong>Localização:</strong> ${ponto.localizacao}<br>
          <strong>Capacidade:</strong> ${ponto.capacidade}<br>
          <strong>Iluminado:</strong> ${ponto.iluminado ? "Sim" : "Não"}<br>
          <strong>Coberto:</strong> ${ponto.coberto ? "Sim" : "Não"}<br>
        `;
      });
  
      container.appendChild(div);
    });
  }
  
  fecharModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
  });
  
  document.addEventListener("DOMContentLoaded", atualizarTela);
