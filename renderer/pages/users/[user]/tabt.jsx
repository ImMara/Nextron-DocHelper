import React, {useEffect, useState} from 'react';
import electron from "electron";
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";

const ipcRenderer = electron.ipcRenderer || false;
function Tabt(props) {

    const {user } = useRouter().query;
    const [tensions,setTensions] = useState([]);

    useEffect(()=>{
        setTensions(ipcRenderer.sendSync('get-tension',user))
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
                                <h3 className="card-title">Tensions</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Tension</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        tensions.slice(0).reverse().map((t,i) => (
                                            <tr key={i}>
                                                <td>{t.date}</td>
                                                <td>{t.heure}</td>
                                                <td>{t.tension}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Tension</th>
                                    </tr>
                                    </tfoot>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
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

export default Tabt;