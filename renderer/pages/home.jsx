import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import MainLayout from "../layouts/MainLayout";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;
function Home() {

    const [version, setVersion] = useState('');
    const [update, setUpdate] = useState(false);
    const [updateDownloaded, setUpdateDownloaded] = useState(false);

    const restartApp = () => {
        ipcRenderer.send('restart_app');
    }

    useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.send('app_version');
            ipcRenderer.on('app_version', (event, arg) => {
                ipcRenderer.removeAllListeners('app_version');
                setVersion(arg.version);
            });
            ipcRenderer.on('update_available', () => {
                ipcRenderer.removeAllListeners('update_available');
                setUpdate(true);
            });
            ipcRenderer.on('update_downloaded', () => {
                ipcRenderer.removeAllListeners('update_downloaded');
                setUpdateDownloaded(true);
            });
        }
    }, []);


  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript) - v </title>
      </Head>
      <MainLayout>
          <div className="container w-100 d-flex flex-column justify-content-center">
              <div>
                  <div>
                      <p>{ update ? "update available":"up to date"}</p>
                      <p>{ updateDownloaded && "download done" }</p>
                      {
                            updateDownloaded && <button onClick={restartApp}>Restart</button>
                      }
                  </div>
                  <p>test- -v5</p>
                  <h1 className={"my-5 fw-bolder"}>DOCHELPER APPLICATION {version && version.toString()}</h1>
                  <hr/>
                  <p>1) Ajouter un utilisateur pour commencer</p>
                  <p>2) Une fois ajouter selectionner le au dessus</p>
                  <p>3) Ajouter des données pour l'utilisateur souhaiter</p>
                  <p>4) Imprimer le pdf en cliquant sur le boutton</p>
                  <hr/>
              </div>
          </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default Home;
