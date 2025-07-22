import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes : Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key : string, val : string) => {
    if (key === "data") {
        return new Date(val);
    }

    return val;
}) || [];

function debitar(valor: number) : void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que 0!");
    } else if (valor > saldo) {
        throw new Error("Saldo insuficiente");
    } else saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number) : void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que 0!");
    } else saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso() : Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for(let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", {
                month: "long",
                year: "numeric"
            });

            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }

            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao) : void {
        if (novaTransacao.tipo == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        } else if (novaTransacao.tipo == TipoTransacao.TRANSFERENCIA || novaTransacao.tipo == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error("O tipo de transação informado é inválido!");
        }

        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    },

    agruparTransacoes() : ResumoTransacoes {
        const resumo : ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };

        transacoes.forEach(function(transacao) {
            if (transacao.tipo == TipoTransacao.DEPOSITO) {
                resumo.totalDepositos++;
            } else if (transacao.tipo == TipoTransacao.PAGAMENTO_BOLETO) {
                resumo.totalPagamentosBoleto++;
            } else if (transacao.tipo == TipoTransacao.TRANSFERENCIA) {
                resumo.totalTransferencias++;
            }
        });

        return resumo;
    }
}
export default Conta;
