interface Observer {
    update(state: string): void;
}

interface Subject {
    subscribe(o: Observer): void;
    unsubscribe(o: Observer): void;
    notify(): void;
}

class EventEmitter implements Subject {
    private observers: Observer[] = [];
    private state: string = "";

    setState(newState: string): void {
        this.state = newState;
        this.notify();
    }

    subscribe(o: Observer): void {
        this.observers.push(o);
    }

    unsubscribe(o: Observer): void {
        this.observers = this.observers.filter(obs => obs !== o);
    }

    notify(): void {
        this.observers.forEach(o => o.update(this.state));
    }
}

class Logger implements Observer {
    update(state: string): void {
        console.log(`[Logger] Новий стан: ${state}`);
    }
}

const emitter = new EventEmitter();
emitter.subscribe(new Logger());
emitter.setState("active");
