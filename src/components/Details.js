import React from 'react'

const Details = ({ date, popularity, adult }) => {
    return (
        <div className="show-movie-details">
            <p className="show-movie-details-date"><h3>Release Date:</h3><span>{date}</span></p>
            <p className="show-movie-details-rating"><h3>Rating:</h3><span>{popularity}</span></p>
            <p className="show-movie-details-rating"><h3>Age:</h3>{adult === false ? <span>U/A</span> : <span>Adult</span>}</p>
        </div>
    )
}

export default Details