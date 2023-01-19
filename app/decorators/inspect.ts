export function Inspect() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function(...args: any[]){
            console.log(`--- Metodo ${propertyKey}`);
            console.log(`------ Parametros: ${JSON.stringify(args)}`);
            const retorno = original.apply(this, args);
            console.log(`------ Retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        }
    }
}
