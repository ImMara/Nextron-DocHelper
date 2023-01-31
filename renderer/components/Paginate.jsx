import React from 'react';

function Paginate({postsPerPage,totalPosts,paginate ,previousPage, nextPage , currentPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            {pageNumbers.length > 1 && (
            <ul className="pagination flex-wrap">
                <li className="page-item" onClick={previousPage}><a className="page-link">Précédent</a></li>
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => paginate(number)} className={ currentPage === number ? "page-item active":"page-item"}><a className="page-link">{number}</a></li>
                    ))}
                <li className="page-item" onClick={nextPage}><a className="page-link">Suivant</a></li>
            </ul>
            )}
        </nav>
    );
}

export default Paginate;