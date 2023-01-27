import { app , ipcMain } from 'electron';
import serve from 'electron-serve';
import { autoUpdater } from 'electron-updater';
import { createWindow } from './helpers';
import Store from 'electron-store';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({ directory: 'app' });

} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
    });
    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });

    if (isProd) {
        await mainWindow.loadURL('app://./home.html');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }
})();

app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

const store = new Store({ name: 'users' });

ipcMain.on('get-users', (event, arg) => {
    event.returnValue = store.get('users') || [];
});

ipcMain.on('add-users', (event, arg) => {
    const users = store.get('users') || [];
    users.push({...arg,"glycemie":[],"poids":[],"tension":[]});
    store.set('users', users);
});

ipcMain.on('delete-users',(event,arg) => {
    const users = store.get('users') || [];
    users.splice(arg,1);
    store.set('users',users);
})


ipcMain.on('get-glycemie',(event,arg) => {
    const users = store.get('users') || [];

    const user = users.find((user) => user.prenom === arg);

    event.returnValue = user.glycemie;
})

ipcMain.on('add-glycemie',(event,arg) => {
    const users = store.get('users') || [];

    const user = users.filter((userItem)=>{
        return userItem.prenom === arg.user
    });

    user[0].glycemie.push({
        taux:arg.taux,
        date:arg.date,
        jun:arg.jun,
        quand:arg.quand
    });

    store.set('users',users);
});

ipcMain.on('get-poids',(event,arg) => {
    const users = store.get('users') || [];
    const user = users.find((user) => user.prenom === arg);
    event.returnValue = user.poids;
})

ipcMain.on('add-poids',(event,arg) => {
    const users = store.get('users') || [];

    const user = users.filter((userItem)=>{
        return userItem.prenom === arg.user
    })

    user[0].poids.push({
        poids:arg.poids,
        date:arg.date,
    });

    store.set('users',users);
});

ipcMain.on('get-tension',(event,arg) => {
    const users = store.get('users') || [];

    const user = users.find((user) => user.prenom === arg);

    event.returnValue = user.tension;
} )

ipcMain.on('add-tension',(event,arg) => {
    const users = store.get('users') || [];

    const user = users.filter((userItem)=>{
        return userItem.prenom === arg.user
    })

    user[0].tension.push({
        tension:arg.tension,
        date:arg.date,
        heure:arg.heure,
    });

    store.set('users',users);
});
