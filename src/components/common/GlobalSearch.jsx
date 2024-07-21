import React from 'react'

const GlobalSearch = ({ handleSearch }) => {
    return (
        <>
            <div className="card-header">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="input-group input-group-flush input-group-merge input-group-reverse">
                            <input
                                className="form-control list-search"
                                type="search"
                                placeholder="Search"
                                onChange={handleSearch}
                            />
                            <span className="input-group-text">
                                <i className="fe fe-search" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GlobalSearch