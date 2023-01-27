import React from 'react';

function Paginate({postsPerPage,totalPosts,paginate ,previousPage, nextPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">

            <ul className="pagination">
                <li className="page-item" onClick={previousPage}><a className="page-link" href="#">Previous</a></li>
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => paginate(number)} className="page-item"><a className="page-link">{number}</a></li>
                    ))}
                <li className="page-item" onClick={nextPage}><a className="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    );
}

export default Paginate;