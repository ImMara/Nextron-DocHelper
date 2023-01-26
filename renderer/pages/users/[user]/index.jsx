import React, {useState} from 'react';
import MainLayout from "../../../layouts/MainLayout";
import { useRouter } from 'next/router'
import Link from "next/link";
function Index(props) {
    const router = useRouter();
    const data = router.query;

    const [users,setUsers] = useState(data);

    return (
        <MainLayout>
            <div className="container">
                <h1 className="py-5 text-center fw-bolder">Bonjour, {data.prenom}</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h2 className="text-center fw-bolder"><i className="fa-solid fa-cubes-stacked me-1"></i>SUCRE</h2>
                        <hr/>
                        <Link href={"/users/"+data.prenom+"/formg"}>
                            <a className="btn w-100 p-3 mb-2 btn-primary"><i
                                className="fa-solid fa-file-circle-plus me-1"></i>Ajouter glycemie</a>
                        </Link>
                        <Link href={"/users/"+data.prenom+"/tabg"}>
                            <a className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-eye me-1"></i>Voir le tableaux</a>
                        </Link>

                        <a href="" className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-print me-1"></i>Imprimer le tableau</a>
                    </div>
                    <div className="col-sm-4">
                        <h2 className="text-center fw-bolder"><i className="fa-solid fa-heart-circle-exclamation me-1"></i>TENSION</h2>
                        <hr/>
                        <Link href={"/users/"+data.prenom+"/formt"}>
                            <a className="btn w-100 p-3 mb-2 btn-primary"><i
                                className="fa-solid fa-file-circle-plus me-1"></i>Ajouter une prise de poids</a>
                        </Link>
                        <Link href={"/users/"+data.prenom+"/tabt"}>
                            <a className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-eye me-1"></i>Voir le tableaux</a>
                        </Link>

                        <a href="" className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-print me-1"></i>Imprimer le tableau</a>
                    </div>
                    <div className="col-sm-4">
                        <h2 className="text-center fw-bolder"><i className="fa-solid fa-scale-balanced me-1"></i>POIDS</h2>
                        <hr/>
                        <Link href={"/users/"+data.prenom+"/formp"}>
                            <a href="" className="btn w-100 p-3 mb-2 btn-primary"><i
                                className="fa-solid fa-file-circle-plus me-1"></i>Ajouter une prise de poids</a>
                        </Link>
                        <Link href={"/users/"+data.prenom+"/tabp"}>
                            <a className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-eye me-1"></i>Voir le tableaux</a>
                        </Link>
                        <a href="" className="btn w-100 p-3 mb-2 btn-primary"><i className="fa-solid fa-print me-1"></i>Imprimer le tableau</a>
                    </div>

                </div>
                <a href=""></a>
            </div>

        </MainLayout>
    );
}

export default Index;