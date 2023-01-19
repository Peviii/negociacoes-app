import { DomInjector } from "../decorators/dom-injector.js";
import { logarTempoDeExecucao } from "../decorators/exec-timelog.js";
import { Inspect } from "../decorators/inspect.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { Imprimir } from "../services/imprimir.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegocioController{
    @DomInjector('#data')
    private inputData: HTMLInputElement;
    @DomInjector('#quantidade')
    private inputQuant: HTMLInputElement;
    @DomInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes;
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacaoService = new NegociacoesService;

    constructor(){
        this.negociacoesView.update(this.negociacoes);
    }
    @Inspect()
    @logarTempoDeExecucao(true)
    public adiciona(): void{ 
       const negociacao = Negociacao.criaDe(
        this.inputData.value,
        this.inputQuant.value,
        this.inputValor.value
       );
       if(!this.diaUtil(negociacao.data)){
            this.mensagemView.update('Apenas em dias uteis!');
            return;
        }
        
        this.negociacoes.adiciona(negociacao);
        Imprimir(negociacao, this.negociacoes);
        this.limpaFormulario();
        this.atualizaView(); 
    }
    public importaDados(): void {
        this.negociacaoService.obterNegociacao()
            .then(negociacoesHoje => {
                return negociacoesHoje.filter(negociacaoHoje => {
                    return !this.negociacoes.lista().some(negociacao => negociacao.Igual(negociacaoHoje));
                });
            })
            .then(negociacoesHoje => {
                for( let negociacao of negociacoesHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
            })
    }
    private diaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO 
            && data.getDay() < DiasDaSemana.SABADO
    }
    
    private limpaFormulario(): void{
        this.inputData.value = '';
        this.inputQuant.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}