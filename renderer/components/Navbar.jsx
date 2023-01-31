import React, {useEffect, useState} from 'react';
import Link from "next/link";
import electron from 'electron';
import {useRouter} from "next/router";

const ipcRenderer = electron.ipcRenderer || false;
function Navbar(props) {

    const router = useRouter();
    const currentUser = router.query;
    const path = router.asPath;

    const [users,setUsers] = useState([]);
    const [user,setUser] = useState(null);

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
                        <a className={Object.keys(currentUser).length === 0 ? "nav-link active":"nav-link"} aria-current="page" href="#">DOCHELPER</a>
                    </Link>
                </li>
                {
                    users.map((u,i) => (
                        <li className="nav-item"  key={i}>
                            <Link href={{
                                pathname:`/users/${u.prenom}`,
                                query:u
                            }}>
                                <a className={ currentUser.prenom === u.prenom ? "nav-link active" : "nav-link"}>{u.prenom}</a>
                            </Link>
                        </li>
                    ))
                }
                <li className="m-1 ms-1 ms-sm-auto sp nav-item">
                    <Link href="/adduser">
                        <a className="btn btn-primary sp"><i className="fa-solid fa-plus me-1"></i>Ajouter une personne</a>
                    </Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Navbar;