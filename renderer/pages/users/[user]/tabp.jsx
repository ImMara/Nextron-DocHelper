import React, {useEffect, useState} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import electron from "electron";
import Paginate from "../../../components/Paginate";

const ipcRenderer = electron.ipcRenderer || false;
function Tabp(props) {

    const { user } = useRouter().query;
    const [poids,setPoids] = useState([]);
    const [postsPerPage] = useState(5);
    const [pagination, setPagination] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        setPoids(ipcRenderer.sendSync('get-poids',user))
        return () => {
            // like componentWillUnmount()
        };
    },[])

    const indexOfLastPoids = currentPage * postsPerPage;
    const indexOfFirstPoids = indexOfLastPoids - postsPerPage;
    const currentPoids = poids.slice(0).reverse().slice(indexOfFirstPoids, indexOfLastPoids);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== Math.ceil(poids.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    }

    const print = async() => {
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
                                    {   pagination ?
                                        currentPoids.map((p,i) => (
                                            <tr key={i}>
                                                <td>{p.date}</td>
                                                <td>{p.poids} kg</td>
                                            </tr>
                                        ))
                                        :
                                        (
                                        poids.slice(0).reverse().map((p,i) => (
                                            <tr key={i}>
                                                <td>{p.date}</td>
                                                <td>{p.poids} kg</td>
                                            </tr>
                                        )))
                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Date</th>
                                        <th>Poids</th>
                                    </tr>
                                    </tfoot>
                                </table>
                                {pagination &&
                                    <Paginate
                                        postsPerPage={postsPerPage}
                                        totalPosts={poids.length}
                                        paginate={paginate}
                                        previousPage={previousPage}
                                        nextPage={nextPage}
                                        currentPage={currentPage}
                                    />
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
        </MainLayout>
    );
}

export default Tabp;