import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import tomato from './assets/tomato.png';
import imdb from './assets/IMDB.png';
import facebook from './assets/fa-brands_facebook-square.png';
import instagram from './assets/fa-brands_instagram.png';
import twitter from './assets/fa-brands_twitter.png';
import youtube from './assets/fa-brands_youtube.png';
import { Link } from 'react-router-dom';


function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [top10Movies, setTop10Movies] = useState([]);
  const [movieDetails, setMovieDetails] = useState('');

  const apiKey = '56b10ced2747113175093596cb0982d5';
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmIxMGNlZDI3NDcxMTMxNzUwOTM1OTZjYjA5ODJkNSIsInN1YiI6IjY0ZmU3Y2RjZmE0MDQ2MDBlMTdlYjEzOS';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setQuery(search);
    setSearch("")
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
      .then((response) => response.json())
      .then((response) => {
        if (response.results) {
          const top10Movies = response.results.slice(0, 10);
          console.log(top10Movies);
          setTop10Movies(top10Movies);
        } else {
          console.log("Can't fetch API");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        <div className="min-h-screen bg-johnwick mb-20 max-h-fit">
          <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <img src={tomato} alt="Tomato" className=" max-md:w-[20px]  max-md:h-[20px] h-8" />
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
                <img src="./src/assets/Search.png" alt="Search" className="w-6 h-6" />
              </button>
            </form>
            <div className="flex items-center">
              <p className="font-bold text-sm text-white">Sign in</p>
              <img src="./src/assets/Menu.png" alt="Menu" className="ml-2 w-6 h-6" />
            </div>
          </nav>

  
      <div className='flex flex-col text-white  max-md:w-[200px]   w-[404px] my-[125px] mx-[82px]'>
      <div className='text-white text-[48px] font-bold'>
        John Wick 3: Parabellum
      </div>
      <div className='flex'>
      
      <img src={imdb}></img>
      <span className='font-normal text-[14px] ml-3'>86.0/10</span>
      <img src={tomato} className='ml-3'>
 
      </img>
      <span className='font-normal text-[14px] ml-3'>86%</span>
     
      </div>
      <p className='text-[14px] font-medium'>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
      </div>

      </div>
      <div className="m-auto mx-[82px]">
        <div className="flex my-10 justify-between">
          <span>Featured Movies</span>
          <div className='flex'>
          <span className='font-normal text-[#BE123C]
'>See More</span>
          <img src='./src/assets/Chevron.png'></img>
          </div>
        </div>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-[80px]">


        {top10Movies.map((info) => (
  <Link to={`/movie/${info.id}`} 
  key={info.id}>
    <Card
      title={info.title}
      releasedate={info.release_date}
      backdrop={info.backdrop_path}
    />
  </Link>
))}
</div>



      </div>

      <footer className='flex flex-col my-7   h-[150px] justify-between '>
        <div className='flex justify-center'>
      <img src={facebook} className='mr-[48px]'></img>
        <img src={instagram} className='mr-[48px]'></img>
        <img src={twitter} className='mr-[48px]'></img>
        <img src={youtube} className=''></img>
        </div>
        <div className='flex justify-center max-md:mx-10 font-bold text-[18px]'>
          <span className='mr-[48px]'>Conditions Of Use</span>
          <span className='mr-[48px]'>Privacy & Policy</span>
          <span>Press Rooms</span>
        </div>
        <div className=' flex justify-center font-bold text-[18px] text-[#6B7280]'>© 2021 MovieBox by Mistura Yahaya  </div>
      </footer>
      </div>
    </>
 
  )
}

export default App
