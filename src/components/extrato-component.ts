import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato : HTMLElement = document.querySelector(".extrato .registro-transacoes");

function renderizarExtrato() : void {
    const gruposTransacoes : GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes : string = "";

    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem : string = "";

        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipo}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }

    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas.</div>";
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
renderizarExtrato();

const ExtratoComponent = {
    atualizar() : void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;
