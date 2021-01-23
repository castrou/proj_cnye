const { app, BrowserWindow, ipcMain } = require("electron");
const ipcMainHandlers = require('./src/ipcMainHandlers')

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
	win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// register handlers
Object.values(ipcMainHandlers).forEach(event => {
	ipcMain.on(event.name, event.handler)
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
