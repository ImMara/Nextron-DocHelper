import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";


function Home() {
  return (
    <React.Fragment>
      <Head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                crossOrigin="anonymous"/>
        <title>Home - Nextron (with-javascript)</title>
      </Head>
      <MainLayout>
          <div className="container">
            <p>
              ⚡ Electron + Next.js ⚡ -
              <Link href="/next">
                <a className="btn btn-danger">Go to next page</a>
              </Link>
            </p>
          </div>
      </MainLayout>
    </React.Fragment>
  );
};

export default Home;
