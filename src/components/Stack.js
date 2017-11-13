class Stack {
    constructor() {
        this.stack = [];
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    push(item) {
        this.stack.push(item);
    }

    pop() {
        return this.stack.pop();
    }

    clear() {
        this.stack = [];
    }

    size() {
        return this.stack.length;
    }

    toString() {
        return `${this.stack}`;
    }
}

export default Stack