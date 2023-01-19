var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
export class NegocioController {
    constructor() {
        this.negociacoes = new Negociacoes;
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacaoService = new NegociacoesService;
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuant.value, this.inputValor.value);
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas em dias uteis!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        Imprimir(negociacao, this.negociacoes);
        this.limpaFormulario();
        this.atualizaView();
    }
    importaDados() {
        this.negociacaoService.obterNegociacao()
            .then(negociacoesHoje => {
            return negociacoesHoje.filter(negociacaoHoje => {
                return !this.negociacoes.lista().some(negociacao => negociacao.Igual(negociacaoHoje));
            });
        })
            .then(negociacoesHoje => {
            for (let negociacao of negociacoesHoje) {
                this.negociacoes.adiciona(negociacao);
            }
        });
    }
    diaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    limpaFormulario() {
        this.inputData.value = '';
        this.inputQuant.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
__decorate([
    DomInjector('#data')
], NegocioController.prototype, "inputData", void 0);
__decorate([
    DomInjector('#quantidade')
], NegocioController.prototype, "inputQuant", void 0);
__decorate([
    DomInjector('#valor')
], NegocioController.prototype, "inputValor", void 0);
__decorate([
    Inspect(),
    logarTempoDeExecucao(true)
], NegocioController.prototype, "adiciona", null);
//# sourceMappingURL=negocioController.js.map