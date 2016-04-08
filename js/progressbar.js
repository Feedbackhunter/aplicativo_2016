var perguntas = [];
var valor = 0;

function habilitarEnvio(){
	$("#enviar").prop('disabled', false);
}

function somarValor(quantidadePraSomar){
	valor = valor+quantidadePraSomar;
	document.getElementById("progresso").style.width = valor+'%';
	if (valor > 10){
		$("#progresso").removeClass("progress-bar-danger").addClass("progress-bar-warning");

	}
	if (valor > 50){
		$("#progresso").removeClass("progress-bar-warning").addClass("progress-bar-info");
	}
	if (valor > 90){
		$("#progresso").removeClass("progress-bar-info").addClass("progress-bar-success");
	}
}
function alterarProgressBar(pergunta, valor){
	if($.inArray(pergunta, perguntas) == -1){
		perguntas[perguntas.length] = pergunta;
		somarValor(valor);
	}
	habilitarEnvio();
}