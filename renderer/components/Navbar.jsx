import React from 'react';
import Link from "next/link";

function Navbar(props) {
    return (
        <React.Fragment>
            <ul className="nav nav-tabs mt-1">
                <li className="nav-item">
                    <Link href="/home">
                        <a className="nav-link active" aria-current="page" href="#">DOCHELPER</a>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">User1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">User2</a>
                </li>
                <li className="ms-auto me-1 nav-item">
                    <Link href="/adduser">
                        <a className="btn btn-danger">Ajouter une personne</a>
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Navbar;