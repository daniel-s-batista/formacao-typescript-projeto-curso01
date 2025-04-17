var saldo = 3000;
var elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo.textContent = saldo.toString();
var elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação corretamente!");
        return;
    }
    var inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    var inputValor = elementoFormulario.querySelector("#valor");
    var inputData = elementoFormulario.querySelector("#data");
    var tipoTransacao = inputTipoTransacao.value;
    var valor = inputValor.valueAsNumber;
    var data = new Date(inputData.value);
    if (tipoTransacao == "Depósito") {
        saldo += valor;
    }
    else if (tipoTransacao == "Transferência" || tipoTransacao == "Pagamento de Boleto") {
        saldo -= valor;
    }
    else {
        alert("O tipo de transação informado é inválido!");
        return;
    }
    var novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    elementoSaldo.textContent = saldo.toString();
    elementoFormulario.reset();
});
