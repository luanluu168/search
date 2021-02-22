class PriorityQueue {
    constructor() {
        this.priorityQueue = [];
    }

    push(id, priority) {
        this.priorityQueue.push({id, priority});
        this.sort();
    }

    pop() {
        const node = this.priorityQueue.shift();
        return node;
    }

    sort() {
        this.priorityQueue.sort((node1, node2) => node1.priority - node2.priority);
    }

    length() {
        return this.priorityQueue.length;
    }
};