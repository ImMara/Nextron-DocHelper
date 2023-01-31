import React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import electron from "electron";
import {useRouter} from "next/router";

const ipcRenderer = electron.ipcRenderer || false;
function Formp(props) {
    const today = new Date();

    // get the current date with the format yyyy-mm-dd

    const dateIn2Digit = String(today.getDate()).padStart(2, '0');
    const monthIn2Digit = String(today.getMonth() + 1).padStart(2, '0');

    const date = today.getFullYear()+'-'+monthIn2Digit+'-'+dateIn2Digit
    const { user } = useRouter().query;

    const add = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const date = data.get('date');
        const poids = data.get('poids');

        const args = {
            user:user,
            date:date,
            poids:poids
        }

        const response = ipcRenderer.sendSync('add-poids',args);
        if (response) {
            alert('Poids ajouté avec succès');
            e.target.reset();
        } else {
            alert('Erreur lors de l\'ajout du poids');
        }
    }

    return (
        <MainLayout>
            {/* bootsrap form for date and poids */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Poids</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <form onSubmit={add} className="p-3">
                                    <div className="form-group mb-3">
                                        <label htmlFor="date">Date</label>
                                        <input type="date" required defaultValue={date} className="form-control" id="date" name="date" placeholder="Date"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="poids">Poids</label>
                                        <input type="number" required max={'150'}  className="form-control" id="poids" name="poids" placeholder="Poids"/>
                                    </div>
                                    <button type="submit" className="btn btn-danger">Ajouter une prise de poids</button>
                                </form>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
        </MainLayout>
    );
}

export default Formp;