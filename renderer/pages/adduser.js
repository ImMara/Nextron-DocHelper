import React, {useState} from 'react';
import MainLayout from "../layouts/MainLayout";

function Adduser(props) {

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
        console.log(body)
        setUsers([...users,body])
        setBody({
            "nom": "",
            "prenom": "",
        })
    }

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
                        users.map(u => (
                            <tr>
                                <th scope="row">1</th>
                                <td>{u.nom}</td>
                                <td>{u.prenom}</td>
                                <td><a className="btn btn-danger">Supprimer</a></td>
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