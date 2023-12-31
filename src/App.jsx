import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import tomato from './assets/tomato.png';
import imdb from './assets/IMDB.png';
import facebook from './assets/fa-brands_facebook-square.png';
import instagram from './assets/fa-brands_instagram.png';
import twitter from './assets/fa-brands_twitter.png';
import youtube from './assets/fa-brands_youtube.png';
import Search from './assets/Search.png';
import Menu from './assets/Menu.png';
import Loading from './Loading';
import wick from './assets/Poster.png';

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [top10Movies, setTop10Movies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '56b10ced2747113175093596cb0982d5';
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmIxMGNlZDI3NDcxMTMxNzUwOTM1OTZjYjA5ODJkNSIsInN1YiI6IjY0ZmU3Y2RjZmE0MDQ2MDBlMTdlYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VaYdMJHAFK3NqbAlpY7YyY38XOaubJAT27HyuUR4qE4'

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated', options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't fetch API");
        }
        return response.json();
      })
      .then((response) => {
        if (response.results) {
          const top10Movies = response.results.slice(0, 10);
          setTop10Movies(top10Movies);
        } else {
          setError("Couldn't fetch top-rated movies");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div
          className="min-h-screen mb-20 max-h-fit"
          style={{
            backgroundImage: `url(${wick})`,
            backgroundSize: '245vh',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <img src={tomato} alt="Tomato" className="max-md:w-[20px] max-md:h-[20px] h-8" />
              <p className="ml-2 font-bold max-md:text-[14px] text-2xl text-white">Moviebox</p>
            </div>
            <form onSubmit={handleSubmit} className="flex my-4 justify-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="What do you want to watch?"
                className="w-full sm:w-96 bg-transparent text-white px-2 sm:px-4 h-10 sm:h-12 rounded-lg border-2"
              />
              <button type="submit" className="ml-2">
                <img src={Search} alt="Search" className="w-6 h-6" />
              </button>
            </form>
            <div className="flex items-center">
              <p className="font-bold text-sm text-white">Sign in</p>
              <img src={Menu} alt="Menu" className="ml-2 w-6 h-6" />
            </div>
          </nav>

          <div className="flex flex-col text-white max-md:w-[200px] w-[404px] my-[125px] mx-[82px]">
            <div className="text-white text-[48px] font-bold">John Wick 3: Parabellum</div>
            <div className="flex">
              <img src={imdb} alt="IMDB" />
              <span className="font-normal text-[14px] ml-3">86.0/10</span>
              <img src={tomato} alt="Tomato" className="ml-3" />
              <span className="font-normal text-[14px] ml-3">86%</span>
            </div>
            <p className="text-[14px] font-medium">
              John Wick is on the run after killing a member of the international assassins' guild, and with a $14
              million price tag on his head, he is the target of hit men and women everywhere.
            </p>
          </div>

          <div className="m-auto mx-[82px]">
            <div className="flex my-10 justify-between">
              <span>Featured Movies</span>
              <div className="flex">
                <span className="font-normal text-[#BE123C]">See More</span>
                <img src="./src/assets/Chevron.png" alt="See More" />
              </div>
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-[80px]">
              {top10Movies.map((info) => (
                <Card
                  key={info.id}
                  title={info.title}
                  releasedate={info.release_date}
                  backdrop={info.backdrop_path}
                  info={info}
                />
              ))}
            </div>
          </div>

          <footer className="flex flex-col my-7 h-[150px] justify-between">
            <div className="flex justify-center">
              <img src={facebook} alt="Facebook" className="mr-[48px]" />
              <img src={instagram} alt="Instagram" className="mr-[48px]" />
              <img src={twitter} alt="Twitter" className="mr-[48px]" />
              <img src={youtube} alt="YouTube" />
            </div>
            <div className="flex justify-center max-md:mx-10 font-bold text-[18px]">
              <span className="mr-[48px]">Conditions Of Use</span>
              <span className="mr-[48px]">Privacy & Policy</span>
              <span>Press Rooms</span>
            </div>
            <div className="flex justify-center font-bold text-[18px] text-[#6B7280]">
              © 2021 MovieBox by Mistura Yahaya
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
