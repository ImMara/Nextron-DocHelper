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


  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript) - v </title>
      </Head>
      <MainLayout>
          <div className="container w-100 d-flex flex-column justify-content-center">
              <div>
                  {/*<div>*/}
                  {/*    <p>{ update ? "update available":"up to date"}</p>*/}
                  {/*    <p>{ updateDownloaded && "download done" }</p>*/}
                  {/*    <button onClick={restartApp}>Restart</button>*/}
                  {/*</div>*/}
                  <p>test- -v4</p>
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
