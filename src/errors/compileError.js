export default class CompileError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Compile error';
        this.message = message;
        this.description = message;
    }

    static containerNotFound() { throw new CompileError('Container element not found. Make sure to wrap your code around a DOM element with \'wr-container\' class'); }
    static multipleContainersFound() { throw new CompileError('More than one container element found. Only one element with \'wr-container\' class allowed'); }
    static domElementFailedToCompile(id) { throw new CompileError('Element with ID ' + id + ' failed to compile.'); }

}