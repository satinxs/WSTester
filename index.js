import m from 'mithril'

// import 'picnic'
import './src/style.css'

import model from './src/model';

window.model = model;
window.m = m;

import ConnectScreen from './src/ConnectScreen'
import ClientScreen from './src/ClientScreen'

m.route(root, '/', {
    '/': ConnectScreen,
    '/socket': ClientScreen
});