import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import electron from "electron";
import Paginate from "../../../components/Paginate";

// tension : date heure tension
// poids date kg

const ipcRenderer = electron.ipcRenderer || false;

function Tabg(props) {

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const {user} = useRouter().query;
    const [glycemie, setGlycemie] = useState([]);
    const [pagination, setPagination] = useState(true);

    useEffect(() => {
        setGlycemie(ipcRenderer.sendSync('get-glycemie', user))
        return () => {
            // like componentWillUnmount()
        };
    }, [])

    // Get current posts pagination
    const indexOfLastGlycemie = currentPage * postsPerPage;
    const indexOfFirstGlycemie = indexOfLastGlycemie - postsPerPage;
    const currentGlycemie = glycemie.slice(0).reverse().slice(indexOfFirstGlycemie, indexOfLastGlycemie);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(glycemie.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const print = async () => {
        await setPagination(false);
        await window.print();
        setPagination(true);
    }

    return (

        <MainLayout>
            {glycemie ? (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Glycémie</h3>
                                        <a onClick={print} className="btn btn-danger">Imprimer</a>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body overflow-auto">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Taux</th>
                                                <th>Quand?</th>
                                                <th>A jeun?</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                // limit for table
                                                pagination ? currentGlycemie.map((g, i) => (
                                                    <tr key={i}>
                                                        <td>{g.date}</td>
                                                        <td>{g.taux}</td>
                                                        <td>{g.quand}</td>
                                                        <td>{g.jun ? 'oui' : 'non'}</td>
                                                    </tr>
                                                    )
                                                ):(
                                                    glycemie.slice(0).reverse().map((g, i) => (
                                                        <tr key={i}>
                                                            <td>{g.date}</td>
                                                            <td>{g.taux}</td>
                                                            <td>{g.quand}</td>
                                                            <td>{g.jun ? 'oui' : 'non'}</td>
                                                        </tr>
                                                )))
                                            }
                                            </tbody>
                                        </table>
                                        {
                                            pagination && (
                                                <Paginate
                                                    postsPerPage={postsPerPage}
                                                    totalPosts={glycemie.length}
                                                    paginate={paginate}
                                                    previousPage={previousPage}
                                                    nextPage={nextPage}
                                                    currentPage={currentPage}
                                                />
                                            )
                                        }
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                ):(
                <div>loading</div>
                )}
        </MainLayout>

    );
}

export default Tabg;