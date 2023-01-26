import React, {useEffect, useState} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;
function formg(props) {

    const today = new Date();

    // get the current date with the format yyyy-mm-dd

    const dateIn2Digit = String(today.getDate()).padStart(2, '0');
    const monthIn2Digit = String(today.getMonth() + 1).padStart(2, '0');

    const date = today.getFullYear()+'-'+monthIn2Digit+'-'+dateIn2Digit

    // get the user id from the url
    const router = useRouter()
    const { user } = router.query
    console.log(user)

    const add = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const taux = data.get('taux');
        const jun = data.get('jun');
        const quand = data.get('quand');
        const dateF = data.get('date');

        const arg = {
            user:user,
            taux:taux,
            date:dateF,
            jun:jun,
            quand:quand
        }

        ipcRenderer.send('add-glycemie',arg);
    }

    return (
        <MainLayout>
            <div className="container">
                <h1 className="fw-bolder my-5">Ajouter glycemie</h1>
                <form onSubmit={add}>
                    <div className="form-group mb-3">
                            <label htmlFor="inputNumber">Taux</label>
                        <input type="number" name="taux" className="form-control" id="inputNumber" placeholder="Enter number" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputText">Date</label>
                        <input type="date" name="date" defaultValue={date}  className="form-control" id="inputText" placeholder="Enter text" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputDate">Quand?</label>
                        <select className="form-select" name="quand" aria-label="Default select example">
                            <option selected hidden>Open this select menu</option>
                            <option value="Avant-Repas">Avant-midi</option>
                            <option value="Apres-Repas">Apres repas</option>
                        </select>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" name="jun" type="checkbox" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                A jeun
                            </label>
                    </div>
                    <button className="btn btn-success">Ajouter</button>
                </form>
            </div>
        </MainLayout>
    );
        }

export default formg;