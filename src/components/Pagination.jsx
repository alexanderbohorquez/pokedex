import React from 'react';

const Pagination = ({num, setPage}) => {
    return (
        
            <button onClick={() => setPage(num)}>
                {num}
            </button>
        
    );
};

export default Pagination;