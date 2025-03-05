// Contador de máquinas
let contador = 1;

function adicionarMaquina() {
    let div = document.createElement("div");
    div.className = "maquina";
    div.innerHTML = `
        <h4>Máquina ${contador}</h4>
        <label>Posição (nº): <input type="text" class="posicao"></label>
        <label>Identificação (Serial): <input type="text" class="serial"></label>
        <label>Limpeza: 
            <select class="limpeza">
                <option>Efetuada</option>
                <option>Não efetuada</option>
            </select>
        </label>
        <label>Pasta Térmica: 
            <select class="pasta">
                <option>Aplicada</option>
                <option>Não aplicada</option>
            </select>
        </label>
        <label>Operacional: 
            <select class="operacional">
                <option>Sim</option>
                <option>Não</option>
            </select>
        </label>
        <label>Notas finais: <textarea class="notas"></textarea></label>
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

// 📄 Função para exportar como PDF
function gerarPDF() {
    let doc = new jsPDF();
    doc.text("Relatório de Inspeção", 10, 10);
    doc.text(`Sala: ${document.getElementById("sala").value}`, 10, 20);
    doc.text(`Operador: ${document.getElementById("operador").value}`, 10, 30);
    
    let maquinas = document.querySelectorAll(".maquina");
    let y = 40;
    maquinas.forEach((maquina, index) => {
        doc.text(`Máquina ${index + 1}:`, 10, y);
        doc.text(`Posição: ${maquina.querySelector(".posicao").value}`, 10, y + 10);
        doc.text(`Serial: ${maquina.querySelector(".serial").value}`, 10, y + 20);
        doc.text(`Limpeza: ${maquina.querySelector(".limpeza").value}`, 10, y + 30);
        doc.text(`Pasta Térmica: ${maquina.querySelector(".pasta").value}`, 10, y + 40);
        doc.text(`Operacional: ${maquina.querySelector(".operacional").value}`, 10, y + 50);
        doc.text(`Notas: ${maquina.querySelector(".notas").value}`, 10, y + 60);
        y += 70;
    });

    doc.save("Relatorio_Inspecao.pdf");
}

// 📊 Função para exportar como Excel
function gerarExcel() {
    let data = [
        ["Sala", document.getElementById("sala").value],
        ["Operador", document.getElementById("operador").value],
        [],
        ["Máquina", "Posição", "Serial", "Limpeza", "Pasta Térmica", "Operacional", "Notas"]
    ];

    let maquinas = document.querySelectorAll(".maquina");
    maquinas.forEach((maquina, index) => {
        data.push([
            `Máquina ${index + 1}`,
            maquina.querySelector(".posicao").value,
            maquina.querySelector(".serial").value,
            maquina.querySelector(".limpeza").value,
            maquina.querySelector(".pasta").value,
            maquina.querySelector(".operacional").value,
            maquina.querySelector(".notas").value
        ]);
    });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    XLSX.writeFile(wb, "Relatorio_Inspecao.xlsx");
}

// 📧 Simulação de envio de e-mail
function enviarEmail() {
    let emailDestino = prompt("Digite o e-mail do destinatário:");
    if (!emailDestino) return;

    let assunto = encodeURIComponent("Relatório de Inspeção");
    let corpo = encodeURIComponent(`Segue em anexo o relatório da inspeção.\nSala: ${document.getElementById("sala").value}\nOperador: ${document.getElementById("operador").value}`);
    
    window.location.href = `mailto:${emailDestino}?subject=${assunto}&body=${corpo}`;
}
