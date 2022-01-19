import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Details from '../components/Details'

const Form = () => {

    const [name, setName] = useState('')
    const [movies, setMovies] = useState([])
    const [active, setActive] = useState(false)
    const [clickedMovie, setClickedMovie] = useState('')
    const [searchMovie, setSearchMovie] = useState('')

    // console.log(searchMovie)

    const filteredMovies = searchMovie.length === 0 ? movies : movies.filter((movie) => movie.title.toLowerCase().includes(searchMovie.toLocaleLowerCase()))
    // console.log(filteredMovies)

    const submitHandler = (e) => {
        e.preventDefault()
        const movieJson = {
            "adult": false,
            "original_language": "hi",
            "original_title": `${name}`,
            "popularity": 26.816,
            "release_date": "2021-12-17",
            "title": `${name}`,
            "video": false,
            "vote_average": 8.7,
            "vote_count": 3321
        }

        setMovies([
            ...movies,
            movieJson
        ])
        setName('')
    }

    const getMovies = async () => {

        const { data } = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=4f7dbbcf8c33427b9388a5c3794f29a0&language=en-US&page=1')

        const result = data['results']
        setMovies(result)
    }

    const toggleShowMore = (e) => {
        setActive((prevState) => !prevState)
        // console.log(click)
        // console.log(e)
        movies.map((m) => {
            if (m.title === e.target.parentNode.childNodes[0].innerText) {
                setClickedMovie(m.title)
            }
        })
    }

    const deleteHandler = (movie) => {
        setMovies(movies.filter((e) => e !== movie))
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <button>Submit</button>
            </form>
            <input
                type="text"
                placeholder="Search" onChange={(e) => setSearchMovie(e.target.value)} />
            <h2>Results</h2>
            <div className="grid-body">
                {filteredMovies.length === 0 ?
                    <div className="no-movies">No Movies Found</div> :
                    filteredMovies.map((movie, key) => (
                        <div key={key}>
                            <div className="card" key={key} >
                                <h3>{movie.title}</h3>
                                <button className="deleteBtn" onClick={() => deleteHandler(movie)}>Delete</button>
                                <button
                                    className="show-more"
                                    onClick={toggleShowMore}>Show More</button>
                            </div>

                            {active && (movie.title === clickedMovie)
                                ? <Details
                                    date={movie.release_date}
                                    popularity={movie.popularity}
                                    adult={movie.adult}
                                />
                                : <></>}

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Form