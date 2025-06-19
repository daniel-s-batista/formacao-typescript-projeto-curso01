import { TipoTransacao } from "./TipoTransacao";

export type Transacao = {
    tipo: TipoTransacao;
    valor: number;
    data: Date;
}