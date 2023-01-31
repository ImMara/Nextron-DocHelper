import React, {useEffect, useState} from 'react';
import electron from "electron";
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import Paginate from "../../../components/Paginate";

const ipcRenderer = electron.ipcRenderer || false;
function Tabt(props) {

    const {user } = useRouter().query;
    const [tensions,setTensions] = useState([]);
    const [postsPerPage] = useState(5);
    const [pagination, setPagination] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        setTensions(ipcRenderer.sendSync('get-tension',user))
        return () => {
            // like componentWillUnmount()
        };
    },[])

    const indexOfLastTension = currentPage * postsPerPage;
    const indexOfFirstTension = indexOfLastTension - postsPerPage;
    const currentTensions = tensions.slice(0).reverse().slice(indexOfFirstTension, indexOfLastTension);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== Math.ceil(tensions.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const print = async () => {
        await setPagination(false);
        await window.print();
        setPagination(true);
    }


    return (
        <MainLayout>
            {/*bootstrap table*/}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Tensions</h3>
                                <a onClick={print} className="btn btn-danger">Imprimer</a>
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
                                        pagination ? currentTensions.map((t,i) => (
                                            <tr key={i}>
                                                <td>{t.date}</td>
                                                <td>{t.heure}</td>
                                                <td>{t.tension}</td>
                                            </tr>
                                        )) :

                                        tensions.slice(0).reverse().map((t,i) => (
                                            <tr key={i}>
                                                <td>{t.date}</td>
                                                <td>{t.heure}</td>
                                                <td>{t.tension}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                <Paginate
                                    postsPerPage={postsPerPage}
                                    totalPosts={tensions.length}
                                    paginate={paginate}
                                    previousPage={previousPage}
                                    nextPage={nextPage}
                                    currentPage={currentPage}
                                />
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