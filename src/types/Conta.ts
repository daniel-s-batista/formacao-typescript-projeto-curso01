import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso() : Date {
        return new Date();
    },

    registrarTransacao(novaTransacao: Transacao) : void {
        if (novaTransacao.tipo == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valor;
        } else if (novaTransacao.tipo == TipoTransacao.TRANSFERENCIA || novaTransacao.tipo == TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valor;
        } else {
            alert("O tipo de transação informado é inválido!");
            return;
        }
    }
}
export default Conta;
