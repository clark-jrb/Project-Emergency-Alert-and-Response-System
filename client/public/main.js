const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: path.join(__dirname, 'src/images/logo/ears_logo'),
        webPreferences: {
            nodeIntegration: true,
        },
    });

//   win.loadURL('http://localhost:3000'); // Assuming your React app runs on localhost:3000

    win.loadURL(
        app.isPackaged
        ? 'https://project-ears-58af9.web.app'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    // win.loadFile(path.join('build', 'index.html'));
    // win.loadFile(path.join(__dirname, 'build', 'index.html'));


    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }

  // Open the DevTools in development mode
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }

    Menu.setApplicationMenu(null);

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

process.on('uncaughtException', function (err) {
    console.log(err);
})