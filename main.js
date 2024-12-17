// // main.js


// // Modules to control application life and create native browser window
// const { app, BrowserWindow , ipcMain} = require('electron')
// const path = require('node:path')


// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html')

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Algumas APIs podem ser usadas somente depois que este evento ocorre.
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// // In this file you can include the rest of your app's specific main process
// // code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.

// // Comunicação com o renderer process (login e cadastro)
// ipcMain.handle('auth:signup', async (_, { nome, email, senha, tipoUsuario }) => {
//   try {
//     return await cadastrarUsuario(nome, email, senha, tipoUsuario);
//   } catch (error) {
//     console.error('Erro ao cadastrar usuário:', error);
//     return { success: false, message: 'Erro interno no cadastro.' };
//   }
// });

// ipcMain.handle('auth:login', async (_, { email, senha }) => {
//   try {
//     return await fazerLogin(email, senha);
//   } catch (error) {
//     console.error('Erro ao fazer login:', error);
//     return { success: false, message: 'Erro interno no login.' };
//   }
// });
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Função para criar a janela principal
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Permite usar Node.js no frontend (não recomendado em produção)
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Lidar com o IPC do formulário de cadastro
ipcMain.handle('cadastro', async (event, dados) => {
  try {
    // Importar o node-fetch dinamicamente para evitar erros com CommonJS
    const fetch = (...args) =>
      import('node-fetch').then(({ default: fetch }) => fetch(...args));

    const response = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Erro no IPC cadastro:', err);
    return { sucesso: false, mensagem: 'Erro ao conectar com o servidor.' };
  }
});
