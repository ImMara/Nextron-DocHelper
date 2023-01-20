import React from 'react';
import Navbar from "../components/Navbar";
import Head from "next/head";

function MainLayout(props) {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </Head>
            <Navbar />
            <main className="w-100 my-2">
                {props.children}
            </main>
        </>
    );
}

export default MainLayout;