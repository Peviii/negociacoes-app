export function logarTempoDeExecucao(segundos = false) {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = 'milisegundos';
            if (segundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            const retorno = original.apply(this, args);
            const t2 = performance.now();
            console.log(` ${propertyKey} tempo de execucao: ${(t2 - t1) / divisor} ${unidade}.`);
            retorno;
        };
        return descriptor;
    };
}
//# sourceMappingURL=exec-timelog.js.map