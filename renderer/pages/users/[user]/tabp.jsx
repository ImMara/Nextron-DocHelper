import React, {useEffect, useState} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;
function Tabp(props) {

    const { user } = useRouter().query;
    const [poids,setPoids] = useState([]);

    useEffect(()=>{
        setPoids(ipcRenderer.sendSync('get-poids',user))
        return () => {
            // like componentWillUnmount()
        };
    },[])

    const print = () => {
        window.print();
    }

    return (
        <MainLayout>
            {/*bootstrap table*/}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Poids</h3>
                                <a onClick={print} className="btn btn-danger">Imprimer</a>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Poids</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        poids.slice(0).reverse().map((p,i) => (
                                            <tr key={i}>
                                                <td>{p.date}</td>
                                                <td>{p.poids}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Date</th>
                                        <th>Poids</th>
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
        </MainLayout>
    );
}

export default Tabp;