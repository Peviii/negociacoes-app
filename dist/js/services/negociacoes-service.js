import { Negociacao } from "../models/negociacao.js";
export class NegociacoesService {
    obterNegociacao() {
        return fetch('http://localhost:8080/dados')
            .then(res => { return res.json(); })
            .then((dados) => {
            return dados.map(dadoHoje => {
                return new Negociacao(new Date(), dadoHoje.vezes, dadoHoje.montante);
            });
        });
    }
}
//# sourceMappingURL=negociacoes-service.js.map