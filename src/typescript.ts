// Tipos primitivos
let valor : number = 3000;
let nome : string = "Daniel";
let isPago : boolean = false;
let qualquer : any = "três";
qualquer = 3;

// Arrays
const listaNumerica : number[] = [1, 2, 3];
const listaDeString : string[] = ["Um", "Dois", "Três"];
const listaDeBooleans : boolean[] = [true, false];
const listaQualquer1 = [];
const listaQualquer2 : any[] = [];

// Enum
// enum TipoTransacao {
//     DEPOSITO = "Depósito",
//     TRANSFERENCIA = "Transferência",
//     PAGAMENTO_BOLETO = "Pagamento de Boleto"
// }

// Tipos personalizados (Type alias)
// type Transacao = {
//     tipo : TipoTransacao,
//     data : Date,
//     valor : number
// }

// const outraTransacao : Transacao = {
//     tipo: TipoTransacao.DEPOSITO,
//     data: new Date(),
//     valor: 3000
// }
