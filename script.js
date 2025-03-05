let contador = 1;

function adicionarMaquina() {
    let div = document.createElement("div");
    div.className = "maquina";
    div.innerHTML = `
        <h4>Máquina ${contador}</h4>
        <label>Posição (nº): <input type="text"></label>
        <label>Identificação (Serial): <input type="text"></label>
        <label>Limpeza: 
            <select>
                <option>Efetuada</option>
                <option>Não efetuada</option>
            </select>
        </label>
        <label>Pasta Térmica: 
            <select>
                <option>Aplicada</option>
                <option>Não aplicada</option>
            </select>
        </label>
        <label>Operacional: 
            <select>
                <option>Sim</option>
                <option>Não</option>
            </select>
        </label>
        <label>Notas finais: <textarea></textarea></label>
        <button onclick="removerMaquina(this)">Remover</button>
    `;
    document.getElementById("maquinas").appendChild(div);
    contador++;
}

function removerMaquina(botao) {
    botao.parentElement.remove();
}

// Alternar exibição do menu suspenso de exportação
function toggleDropdown() {
    let dropdown = document.getElementById("export-options");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Fechar dropdown ao clicar fora dele
document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("export-options");
    let exportBtn = document.querySelector(".btn.export");

    if (!exportBtn.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

function gerarPDF() {
    alert("Exportando para PDF...");
    // Aqui você pode implementar a geração real do PDF usando bibliotecas como jsPDF
}

function gerarExcel() {
    alert("Exportando para Excel...");
    // Aqui você pode implementar a exportação real para Excel usando bibliotecas como SheetJS
}

function enviarEmail() {
    alert("Aqui vamos enviar o relatório por e-mail");
}
