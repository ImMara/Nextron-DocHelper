import React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

function Formt(props) {

    const today = new Date();
    const dateIn2Digit = String(today.getDate()).padStart(2, '0');
    const monthIn2Digit = String(today.getMonth() + 1).padStart(2, '0');
    const hourIn2Digit = String(today.getHours()).padStart(2, '0');
    const minuteIn2Digit = String(today.getMinutes()).padStart(2, '0');

    const date = today.getFullYear() + '-' + monthIn2Digit + '-' + dateIn2Digit;
    const time = `${hourIn2Digit}:${minuteIn2Digit}`;

    const router = useRouter()
    const {user} = router.query;

    const add = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dateF = data.get('date');
        const tension = data.get('tension');
        const heure = data.get('heure');

        const args = {
            user: user,
            date: dateF,
            tension: tension,
            heure: heure
        }

        const response = ipcRenderer.sendSync('add-tension', args);
        if (response) {
            alert('Tension ajoutée avec succès');
            e.target.reset();
        }else{
            alert('Erreur lors de l\'ajout de la tension');
        }
    }

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Tension</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <form onSubmit={add}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="date">Ajouter une date</label>
                                        <input type="date" required defaultValue={date} name="date" className="form-control"
                                               id="date" placeholder="Ajouter une date"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="tension">Ajouter une prise de tension</label>
                                        <input type="number" required name="tension" className="form-control" id="tension"
                                               placeholder="Ajouter la tension mesuré"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="heure">À quelle heure la prise de tension a-t-elle été effectuée</label>
                                        <input type="time" required defaultValue={time} name="heure" className="form-control"
                                               id="quand" placeholder="Ajouter une heure"/>
                                    </div>
                                    <button type="submit" className="btn btn-danger">Ajouter une prise de tension</button>
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

export default Formt;