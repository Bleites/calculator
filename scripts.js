// Seleção dos elementos
const display = document.querySelector('#displayInput');
const botaoIgual = document.querySelector('.igual');
const botaoPonto = document.querySelector('.ponto');
const botoesNumeros = document.querySelectorAll('.num');
const botoesOperadores = document.querySelectorAll('.operador');

const botaoReset = document.createElement('button');
botaoReset.value = 'reset';
botaoReset.textContent = 'reset';
botaoReset.addEventListener('click', resetValores);
document.body.appendChild(botaoReset);

function resetValores() {
	display.value = '';
	operador = null;
}

// Variáveis globais
let operacaoAtual = '';
let operador = null;
let valorAnterior = '';
let calculando = false;

// Funções
const atualizaDisplay = () => {
	display.value = operacaoAtual;
};

const insereNumero = (event) => {
	if (calculando) {
		// se ja estivermos a calcular e ou tivermos feito um calculo e depois inserirmos um numero
		// ele vai dar reset aos valores no display como acontece com as calculadoras normais
		operacaoAtual = event.target.textContent;
		// por isso o calculando aqui vira false
		calculando = false;
	} else {
		// Se não estiver a fazer nenhum calculo vamos concatenar o que vamos escrevendo por exemplo
		// 555 e cada vez que clicarmos no 5 ele vai juntando mais 5's.
		operacaoAtual += event.target.textContent;
	}
	atualizaDisplay();
};

function inserePonto() {
	// aqui vamos verificar se temos algum  ponto === -1 , quer dizer que não encontramos nenhum ponto
	if (operacaoAtual.indexOf('.') === -1) {
		// então vamos adicionar o ponto, concatenamos o ponto aos numeros já adicionados
		operacaoAtual += '.';
		atualizaDisplay();
	}
}

function insereOperador(event) {
	// vamos fazer as nossas validações
	// Se a nossa operação actual não estiver vazia ok podemos adicionar operador
	if (operacaoAtual !== '') {
		if (!calculando) {
			// se o cliente não estiver já a calcular, porque se já estiver isso significa que já adicionou um operador
			if (operador !== null) {
				// se operador for diferente de null significa que já foi escolhido o operador temos de calcular
				calcula();
			}
			valorAnterior = operacaoAtual;
			// aqui dizemos que a operaçao actual volta a ser vazia para podermos voltar a preencher com numeros para calcular
			// com o valor anterior
			operacaoAtual = '';
		}
		operador = event.target.textContent;
	}
}

function calcula() {
	let resultado = null;
	const operandoAnterior = parseFloat(valorAnterior);
	const operandoActual = parseFloat(operacaoAtual);

	switch (operador) {
		case '+':
			resultado = operandoAnterior + operandoActual;
			break;
		case '-':
			resultado = operandoAnterior - operandoActual;
			break;
		case '*':
			resultado = operandoAnterior * operandoActual;
			break;
		case '/':
			resultado = operandoAnterior / operandoActual;
			break;
	}

	operacaoAtual = String(resultado);
	valorAnterior = operacaoAtual;
	calculando = true;
	atualizaDisplay();
}

// eventos
botaoPonto.addEventListener('click', inserePonto);
botoesNumeros.forEach((botao) => botao.addEventListener('click', insereNumero));
botoesOperadores.forEach((botao) =>
	botao.addEventListener('click', insereOperador)
);

botaoIgual.addEventListener('click', calcula);
