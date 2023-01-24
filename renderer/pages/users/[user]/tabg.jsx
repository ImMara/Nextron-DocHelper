import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import electron from "electron";


const ipcRenderer = electron.ipcRenderer || false;
function Tabg(props) {

    const { user } = useRouter().query;
    console.log(user);
    const [glycemie,setGlycemie] = useState([]);

    useEffect(()=>{
        setGlycemie(ipcRenderer.sendSync('get-glycemie',user))
        return () => {
            // like componentWillUnmount()
        };
    },[])

    return (
        <MainLayout>
            {/*bootstrap table*/}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Glycémie</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Taux</th>
                                        <th>Quand?</th>
                                        <th>A jun?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        glycemie.slice(0).reverse().map((g,i) => (
                                            <tr key={i}>
                                                <td>{g.date}</td>
                                                <td>{g.taux}</td>
                                                <td>{g.quand}</td>
                                                <td>{g.jun ? 'oui' : 'non'}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Date</th>
                                        <th>Taux</th>
                                        <th>Quand?</th>
                                        <th>A jun?</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </MainLayout>
    );
}

export default Tabg;