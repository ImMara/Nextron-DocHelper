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

    const date = today.getFullYear() + '-' + monthIn2Digit + '-' + dateIn2Digit

    // get the user id from the url
    const router = useRouter()
    const {user} = router.query

    const add = (e) => {

        e.preventDefault();

            const data = new FormData(e.target);
            const taux = data.get('taux');
            const jun = data.get('jun');
            const quand = data.get('quand');
            const dateF = data.get('date');

            const arg = {
                user: user,
                taux: taux,
                date: dateF,
                jun: jun,
                quand: quand
            }

            const response = ipcRenderer.sendSync('add-glycemie', arg);
            if(response){
                alert('Ajouté avec succès')
                e.target.reset();
            }else{
                alert('Erreur lors de l\'ajout')
            }
        }

    return (
        <MainLayout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">glycemie</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form onSubmit={add} className='p-3'>
                                <div className="form-group mb-3">
                                    <label htmlFor="inputNumber">Taux de sucre</label>
                                    <input type="number" name="taux" required className="form-control" id="inputNumber"
                                           placeholder="Ajouter le taux de sucre mesuré"/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="inputText">Ajouter une date</label>
                                    <input type="date" name="date" required defaultValue={date} className="form-control"
                                           id="inputText" placeholder="Ajouter une date" required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="inputDate">Quand est la mesure a été prise?</label>
                                    <select className="form-select" required name="quand" aria-label="Default select example">
                                        <option disabled selected value="" hidden>Ouvrir le menu</option>
                                        <option value="Avant-Repas">Avant-midi</option>
                                        <option value="Apres-Repas">Apres repas</option>
                                    </select>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" name="jun" type="checkbox" id="defaultCheck1"/>
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        La prise est faite à jeun ? Si oui, cocher la case.
                                    </label>
                                </div>
                                <button className="btn btn-danger">Ajouter une prise de sucre</button>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default formg;