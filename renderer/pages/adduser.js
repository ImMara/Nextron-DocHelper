import React, {useEffect, useState} from 'react';
import MainLayout from "../layouts/MainLayout";
import electron from 'electron';
import { useRouter } from 'next/router'

const ipcRenderer = electron.ipcRenderer || false;
function Adduser(props) {

    const router = useRouter()

    const [users,setUsers] = useState([])
    const [body, setBody] = useState({
        "nom": "",
        "prenom": "",
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setBody({...body, [name]: value})
    }

    const handleClick = (event) =>{
        ipcRenderer.send('add-users', body);
        setUsers([...users,body])
        setBody({
            "nom": "",
            "prenom": "",
        })
        router.push('/home')
    }

    const handleDelete = (index)=>{
        ipcRenderer.send('delete-users', index);
        users.slice(index,1)
        router.push('/home')
    }

    useEffect(()=>{
        setUsers(ipcRenderer.sendSync('get-users'))
        return () => {
            // like componentWillUnmount()
        };
    },[])


    return (
        <MainLayout>
            <div className="container">
                <h1 className={"fw-bolder text-uppercase my-5"}>Ajouter une personne</h1>
                <hr/>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="nom"
                        aria-label="nom"
                        name="nom"
                        onChange={handleChange}
                        value={body.nom}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">@</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="prenom"
                        aria-label="prenom"
                        name="prenom"
                        onChange={handleChange}
                        value={body.prenom}
                    />
                </div>
                <button className={"btn btn-primary"} onClick={handleClick}>Ajouter</button>
                <hr/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((u,i) => (
                            <tr>
                                <th scope="row">1</th>
                                <td>{u.prenom}</td>
                                <td>{u.nom}</td>
                                <td><a className="btn btn-danger" onClick={(event) => handleDelete(i)}>Supprimer</a></td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}

export default Adduser;