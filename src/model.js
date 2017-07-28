const log = console.log;

class Model {
    constructor() {
        this.id = +new Date();
        this.host = 'wss://echo.websocket.org';
        this.socket = null;
        this.status = "Disconnected";
        this.messages = [];
        this.line = '';
        this.isConnecting = false;
    }

    connect() {
        try {
            log("Connecting to ", this.host);
            this.isConnecting = true;

            this.socket = new WebSocket(this.host);

            this.socket.onerror = ev => {
                this.status = "Disconnected";
                log("Error", ev);
                this.socket = null;
            };

            this.socket.onclose = ev => {
                this.status = "Closed";
                this.socket = null;
            }

            this.socket.onmessage = (e) => this.onMessage(e);

            this.socket.onopen = ev => {
                try {
                    this.isConnecting = false;
                    this.status = "Connected";
                    m.route.set('/socket');
                } catch (err) {
                    log('Error On Open', err);
                }
            };
        } catch (err) {
            log("Error", err);
        }
    }

    send(data) {
        this.addMessage('You', data);
        this.socket.send(data);
    }

    onMessage(e) {
        try {
            this.addMessage('Server', e.data);
            e.preventDefault();
        } catch (err) {
            log('Error', err);
        }
    }

    close() {
        if (this.socket)
            this.socket.close();

        this.messages = [];

        m.route.set('/')
    }

    addMessage(from, msg) {
        if (!this.messages)
            this.messages = [];

        this.messages.push(from + ': ' + JSON.stringify(msg));
        m.redraw();
    }
}

export default new Model();