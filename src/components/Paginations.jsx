import React, { useState, useEffect } from 'react';
import '../css/pagination.css'

function Paginations({ totalItems, itemsPerPage, onPageChange, currentPage}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPageState, setCurrentPageState] = useState(currentPage);

    useEffect(() => {
        // Check if there's a saved current page in localStorage
        const savedPage = localStorage.getItem('currentPages');
        if (savedPage) {
            setCurrentPageState(parseInt(savedPage));
        }
    }, []);

    const handlePageChange = (page) => {
        setCurrentPageState(page);
        // Save current page to localStorage
        localStorage.setItem('currentPages', page);
        onPageChange(page);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={currentPageState === i ? 'active-m' : ''}>
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="pagination-btn">
            <button onClick={() => handlePageChange(currentPageState - 1)} disabled={currentPageState === 1}>Previous</button>
            {renderPaginationButtons()}
            <button onClick={() => handlePageChange(currentPageState + 1)} disabled={currentPageState === totalPages}>Next</button>
        </div>
    );
}

export default Paginations;
