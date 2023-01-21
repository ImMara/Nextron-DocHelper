import React, {useEffect, useState} from 'react';
import Link from "next/link";
import electron from 'electron';

const ipcRenderer = electron.ipcRenderer || false;
function Navbar(props) {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        setUsers(ipcRenderer.sendSync('get-users'))
        return () => {
            // like componentWillUnmount()
        };
    },[])

    return (
        <React.Fragment>
            <ul className="nav nav-tabs mt-1">
                <li className="nav-item">
                    <Link href="/home">
                        <a className="nav-link active" aria-current="page" href="#">DOCHELPER</a>
                    </Link>
                </li>
                {
                    users.map((u,i) => (
                        <li className="nav-item">
                            <a className="nav-link" href="#">{u.prenom}</a>
                        </li>
                    ))
                }
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