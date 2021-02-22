class Stack {
    constructor() {
        this.stack = [];
    }

    push(item) {
        return this.stack.push(item);
    }

    pop(item) {
        return this.stack.pop(item);
    }

    length() {
        return this.stack.length;
    }
};