// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.


// contextBridge.exposeInMainWorld('authAPI', {
//   signup: (userData) => ipcRenderer.invoke('auth:signup', userData),
//   login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
// });


// window.addEventListener('DOMContentLoaded', () => {
//   console.log('Preload carregado com sucesso.');
// });





// Expondo funções para o frontend
contextBridge.exposeInMainWorld('api', {
  cadastro: (dados) => ipcRenderer.invoke('cadastro', dados),
});


