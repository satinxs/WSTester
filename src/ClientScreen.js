const sendLineOnKeyPress = e => {
    if (e.charCode === 13)
        sendLine();
}

const sendLine = () => {
    model.send(model.line);
    model.line = '';
}

const scrollToBottom = v => {
    v.dom.scrollTop = v.dom.scrollHeight;
}

export default class ClientScreen {
    constructor() {
        if (!model.socket)
            m.route.set('/');
    }

    view() {
        return <article class="card">
            <header><h3>Client: {model.status}</h3></header>
            {m('.listview', { onupdate: v => scrollToBottom(v) }, model.messages.map(msg => m('p.stack', msg)))}
            <input value={model.line} oninput={m.withAttr('value', v => model.line = v)} onkeypress={e => sendLineOnKeyPress(e)} autofocus />
            <footer>
                <button onclick={() => sendLine()}>Send</button>
                <button class="dangerous" onclick={() => model.close()}>Back</button>
            </footer>
        </article>;
    }
}