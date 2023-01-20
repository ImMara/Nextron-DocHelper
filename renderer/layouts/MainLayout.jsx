import React from 'react';
import Navbar from "../components/Navbar";

function MainLayout(props) {
    return (
        <div>
            <Navbar />
            <main>
                {props.children}
            </main>
        </div>
    );
}

export default MainLayout;