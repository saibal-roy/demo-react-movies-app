import React, {useState} from 'react';
import Card from './Card';

const SearchMovies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        // console.log("submitting");

        const url = `https://api.themoviedb.org/3/search/movie?api_key=37433e2e3dfeff1392d678bb2f73656c&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data  = await res.json();
            // console.log(data.results);
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }

    }

    return ( 
        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query" placeholder="i.e. Jurassic Park" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <Card movie={movie} key={movie.id}/>
                ))}
            </div>    
        </>
     );
}
 
export default SearchMovies;