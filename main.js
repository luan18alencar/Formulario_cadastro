'use strict'; //ativa o modo restrito
// codigo para consumo de API da via cep
//https://viacep.com.br/
 
 
// LIMPAR CONSULTA DO FORM JA REALIZADO
 
const limparFormlario = () =>{
    //ESSA FUNÇÃO FAZ A LIMPEZA DOS CAMPOS
    document.getElementById('rua').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
}
 
//Função para preencher campos relacionados ao CEP
const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    //coloca o valor de logradouro da API dentro do campo rua do formulário
    document.getElementById('bairro').value = endereco.bairro;
    //coloca o valor de Bairro da API dentro do campo bairro do formulário
    document.getElementById('cidade').value = endereco.localidade;
    //coloca o valor de localidade da API dentro do campo cidade do formulário
    document.getElementById('estado').value = endereco.uf;
    //coloca o valor de uf da API dentro do campo estado do formulário
}
 
// VERIFICA SE O CEP É VÁLIDO
// faz uma expreção regular para verificar se apenas foram digitados números
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// O código está pegando o número do CEP que o usuário digitou em um campo específico da página e verificando se ele tem o tamanho correto (8 dígitos). Se o CEP tiver mais ou menos que 8 dígitos, o código provavelmente irá mostrar uma mensagem de erro para o usuário, informando que o CEP está inválido.
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
 
 
const pesquisarCep =async() => {
        //COM ESSE CÓDIGO "ASYNC" DEIXA O CÓDIGO SÍNCRONO, UM CÓDIGO SÍNCONO, UM CÓDIGO SÍNCRONO É AQUELE QUE OCORRE EM SEQUÊNCIA, UMA INSTRUÇÃO APÓS A OUTRA.
    limparFormlario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`; //está criando uma constante chamada url para armazenar o endereço da API do ViaCEP. A parte cep.value indica que o valor do CEP digitado pelo usuário será inserido nessa URL, permitindo que a API busque as informações específicas para aquele CEP.
    if(cepValido(cep.value)){
        const dados = await fetch(url);
            // Imagine que você está fazendo um pedido em um restaurante. Você faz o pedido (a requisição) e espera o garçom trazer o prato (a resposta). O await é como se você falasse para o garçom: "Só continue com as outras tarefas quando o meu pedido estiver pronto".
        const addres = await dados.json();
            // Imagine que você fez um pedido de comida em um restaurante e o garçom te entrega um pacote fechado. Você precisa abrir esse pacote (o equivalente a transformar a resposta da API em um formato que você possa entender) para ver o que tem dentro (os dados do endereço).
    if(addres.hasOwnProperty('erro')){
        // Imagine que você pediu informações sobre um produto em uma loja online. A loja te envia uma resposta, mas essa resposta pode indicar que o produto está indisponível ou que houve algum problema com a sua solicitação.
        alert('CEP não encontado')  
    }
    else{
        // Se não houver erro, o formulário é preenchido com os dados do endereço
        preencherFormulario(addres);
    }
}else{
        alert('CEP incorreto')
    }
    }
// Executa a ação de preenchimento do formulário ao deixar o campo CEP
document.getElementById('cep').addEventListener('focusout', pesquisarCep);

