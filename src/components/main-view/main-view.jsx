import React from 'react';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  


  // useEffect hook allows React to perform side effects in component e.g fetching data
  useEffect(() => {
    if (!token) {
      return;
    }
  

    fetch('https://myflixfinder.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}

    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const moviesFromApi = data.docs.map((doc) => {
          setLoading(false);
          return {
            id: doc._id,
            // id:doc.key  instead possibly//
            title: doc.Title,
            director: doc.director_name?.[0]
          };
        });
        setMovies(moviesFromApi);
   
      })
    } ,[token])
     
  // });       ----maybe uncomment

  //unclear about this second useEffect placement.  Everything below//
  // useEffect(() => {
  //   if (!token) return;
 
  //   fetch("..../movies", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then((movies) => {
  //       setMovies(movies);
 
  //     });
  // }, [token]);
//everything above to previous comment//


//unclear about this placement below.  under 'authentication measures' in 3.5//

  if (!user) {
    return (
      <>
      
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or <SignupView />
        </>
    );
  }
//through this point.  everything in between.//


//unclear below too//
<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//unclear above too//


if (selectedMovie) {
  return (
    <>
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
    }}
    > Logout 
    </button>
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    </>
  );
}

if (movies.length === 0) {
  return (
    <>
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
    }}
    > Logout
    </button>
    <div>The list is empty!</div>
  </>
  );
}



eturn (
  <div>
    <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
    }}
  > Logout
  </button>
    {movies.map((movie) => (
      <MovieCard
        key={movie._id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
      />
    ))}
  </div>
);
}