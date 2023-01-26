import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";


function Home() {

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <MainLayout>
          <div className="container w-100 d-flex flex-column justify-content-center">
              <div>
                  <h1 className={"my-5 fw-bolder"}>DOCHELPER APPLICATION</h1>
                  <hr/>
                  <p>1) Ajouter un utilisateur pour commencer</p>
                  <p>2) Une fois ajouter selectionner le au dessus</p>
                  <p>3) Ajouter des données pour l'utilisateur souhaiter</p>
                  <p>4) Imprimer le pdf en cliquant sur le boutton</p>
                  <hr/>
                  <h2>V1.2</h2>
              </div>
          </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default Home;
