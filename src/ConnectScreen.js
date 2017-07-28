function Connect(charCode) {
    if (charCode === 13)
        model.connect();
}

export default class ConnectScreen {
    constructor(v) { }

    view() {
        return <div class="card">
            <header><h3>Connect</h3></header>
            <input
                value={model.host}
                oninput={m.withAttr('value', (v) => model.host = v)}
                onkeypress={(e) => Connect(e.charCode)} />
            <footer>
                <button onclick={() => model.connect()} class={(model.isConnecting ? 'loading' : '')}>Connect</button>
            </footer>
        </div>;
    }
}