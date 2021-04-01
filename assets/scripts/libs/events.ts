interface Callback {
    (params: any, target?: any): void;
}

interface Event {
    name: string;
    callbacks: {cb: Callback, self?: any}[];
}

class Events {

    private events: Event[] = [];

    private getEvent (eventName: string): Event {
        let events = this.events.filter(i => i.name == eventName)
        return events[0]
    }

    private addEvent (eventName: string, cb: Callback, self?: any): void {
        let event = this.getEvent(eventName);
        let callback = {
            cb: cb,
            self
        }
        if (event) {
            event.callbacks.push(callback)
        } else {
            this.events.push({
                name: eventName,
                callbacks: [callback]
            })
        }
    };

    private removeEvent(eventName: string, cb?: Callback, self?: any): void {
        let event = this.getEvent(eventName)
        if (!event) {
            return
        }
        event.callbacks.map((c, index) => {
            if (cb && self && c.cb == cb && c.self == self) {
                return index
            } else if (cb && !self && c.cb == cb) {
                return index
            } else if (self && !cb && c.self == self) {
                return index
            } else if (!cb && !self) {
                return index
            }
            return -1
        }).filter(i => i > -1).reverse().forEach(i => event.callbacks.splice(i, 1))
    };

    public emit (eventName: string, params: any, target?: any): void {
        let event = this.getEvent(eventName);
        if (!event) {
            return
        }
        event.callbacks.forEach(c => {
            c.cb(params, target)
        })
    };

    public on (eventName: string, cb: Callback, self?: any): void {
        this.addEvent(eventName, cb, self)
    };

    public off (eventName: string, cb?: Callback, self?: any): void {
        this.removeEvent(eventName, cb, self)
    }

}

export const GlobalEvent = new Events();