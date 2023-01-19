import { NegocioController } from './controllers/negocioController.js';

const controller = new NegocioController();
const form = document.querySelector('.form');
if(form){
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('não foi possivel iniciar o app')
}

const Importabutton = document.querySelector('#botao-importa')
if(Importabutton){
    form.addEventListener('click', () => {
        controller.importaDados();
    });
} else {
    throw Error('não foi possivel encontrar o botao')
}
