export function Inspect() {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            console.log(`--- Metodo ${propertyKey}`);
            console.log(`------ Parametros: ${JSON.stringify(args)}`);
            const retorno = original.apply(this, args);
            console.log(`------ Retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        };
    };
}
//# sourceMappingURL=inspect.js.map