class Evaluation {
    title: string;
    due_date: number[];
    weight: number;
    grade: number;
    complete: boolean;

    constructor(message: string, ) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");