const { app, BrowserWindow, ipcMain } = require("electron");

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
// todo: move this to api.js
async function apiToggleSign(sign) {
	// temporary filler async thing
	const seconds = Math.random() * 2
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true)
		}, seconds * 1000)
	})
}
ipcMain.on('zodiac-clicked', (event, sign) => {
	// this is where we send a message to the thing to do an async
	// request to toggle the light
	apiToggleSign(sign).then(() => {
		event.reply('registered-zodiac-click', {
			success: true,
			sign
		})
	}).catch(err => {
	})
})



app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
