class Queue {
    constructor() {
        this.queue = [];
    }

    push(item) {
        return this.queue.push(item);
    }

    pop(item) {
        return this.queue.shift(item);
    }

    length() {
        return this.queue.length;
    }
};