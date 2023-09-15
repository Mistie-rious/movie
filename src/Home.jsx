import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import logo from './assets/tv.png';
import home from './assets/Home.png';
import show from './assets/TVshow.png';
import calendar from './assets/Calendar.png';
import logout from './assets/Logout.png';
import Loading from './Loading';
import classNames from 'classnames';

function Home() {
  const [selected, setSelected] = useState(false);
  const apiKey = '56b10ced2747113175093596cb0982d5';
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setMovieData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Catch error', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  let backdropImage = null;

  if (movieData && movieData.backdrop_path) {
    backdropImage = `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`;
  }

  return (
    <div className="h-screen">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="flex justify-center items-center h-screen text-red-600">
          Error: {error}
        </div>
      ) : (
        <div className="flex min-h-screen max-h-fit gap-14">
          <nav className="flex rounded-r-3xl px-4 max-h-fit w-[400px] justify-between flex-col bg-gray-200">
            <Link to={`/`}>
              <div className="flex items-center ">
                <img src={logo} className="w-8" alt="Logo" />
                <span className="ml-3 my-5">Moviebox</span>
              </div>
            </Link>
            <div className="flex">
              <img className="" src={home} alt="Home" />
              <span className="ml-3">Home</span>
            </div>
            <div className="flex">
              <img src={show} className="w-7 h-7" alt="TV Show" />
              <span className="ml-3">TV Show</span>
            </div>
            <div className="flex">
              <img src={calendar} alt="Upcoming" />
              <span className="w-fit ml-3">Upcoming</span>
            </div>
            <div className="flex">
              <img src={logout} alt="Logout" />
              <span className="ml-3">Logout</span>
            </div>
          </nav>
          <div className="mx-6 my-6">
            <div>
              <img
                src={backdropImage}
                className="w-fit h-fit rounded-[20px]"
                alt="Backdrop"
              />
            </div>
            <div className="my-3 flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span
                    data-testid="movie-title"
                    className="font-bold text-3xl text-gray-800"
                  >
                    {movieData.title}
                  </span>
                  <span
                    data-testid="movie-release-date"
                    className="mb-6 text-gray-600"
                  >
                    Released on: {movieData.release_date}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(!selected)}
                  className={classNames('bg-gray-200 h-fit w-fit px-3', {
                    'bg-gray-300 text-white': selected,
                  })}
                >
                  Favorite
                </button>
              </div>
              <span
                data-testid="movie-title"
                className="text-lg text-gray-700"
              >
                Runtime: {movieData.runtime} minutes
              </span>
            </div>
            <p data-testid="overview" className="my-4 text-gray-800">
              {movieData.overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
 