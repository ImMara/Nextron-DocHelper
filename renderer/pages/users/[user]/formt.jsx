import React from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

function Formt(props) {

    const today = new Date();
    const dateIn2Digit = String(today.getDate()).padStart(2, '0');
    const monthIn2Digit = String(today.getMonth() + 1).padStart(2, '0');

    const date = today.getFullYear()+'-'+monthIn2Digit+'-'+dateIn2Digit;

    const router = useRouter()
    const { user } = router.query;

    const add = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(e.target);
        const args = {
            user : user,
            date : data.get('date'),
            tension : data.get('tension'),
            heure: data.get('heure')
        }
        console.log(data);
        ipcRenderer.sendSync('add-tension',args);
    }

    return (
        <MainLayout>
            <div className="container">
                <h1 className="py-5 text-center fw-bolder">Ajouter une tension</h1>
                <form onSubmit={add}>
                    <div className="form-group mb-3">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" className="form-control" id="date" placeholder="Date"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tension">Tension</label>
                        <input type="number" name="tension" className="form-control" id="tension" placeholder="Tension"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="heure">Heure?</label>
                        <input type="time" name="heure" className="form-control" id="quand" placeholder="Heure"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </MainLayout>
    );
}

export default Formt;