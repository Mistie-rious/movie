import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from './assets/tv.png'
import home from './assets/Home.png'
import show from './assets/TVshow.png'
import projector from './assets/Projector.png'
import calendar from './assets/Calendar.png'
import logout from './assets/Logout.png'
import { Link } from 'react-router-dom';
import star from './assets/Star.png'
import Loading from './Loading';
import classNames from 'classnames';

function Home() {
    const [selected, setSelected] = useState(false)
  const apiKey = '56b10ced2747113175093596cb0982d5'
  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(true);
    const { id } = useParams(); 
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Couldnt fetch')
            
        }
        else{
            return response.json()
        }
      }  )
      .then(data =>
        {
            setMovieData(data)
            console.log(data)
        })

        .catch (error => {
            console.error('Catch error', error)
        })
        .finally(() => {
            setLoading(false);
          })
        let backdropImage = null;

        if (movieData && movieData.backdrop_path) {
          backdropImage = `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`;
        }
  return (
    <div className='h-screen'>
                {loading ? 
        (<Loading/> ) : (
    <div className='flex min-h-screen max-h-fit gap-14'>
        <nav className='flex rounded-3xl px-4 max-h-fit w-[400px]   justify-between flex-col'>
            <Link  to={`/`} >
        <div className='flex items-center '>
            <img src={logo} className='w-8'></img>
            <span className='ml-3'>Moviebox</span>
        </div>
        </Link>
        <div className='flex'>
            <img className='' src={home}></img>
            <span className='ml-3'>Home</span>
        </div>
        <div className='flex'>
            <img src={show} className='w-7 h-7'></img>
            <span className='ml-3'>TV Show</span>
        </div>
        <div className='flex'>
            <img src={calendar}></img>
            <span className='w-fit ml-3'>Upcoming</span>
        </div>
      
        <div className='flex'>
            <img src={logout}></img>
            <span className='ml-3'>Logout</span>
        </div>
        </nav>
        <div className='mx-6 my-6'>
        <div className=''>
            <img src={backdropImage} className='w-fit  h-fit rounded-[20px]'></img>
        </div>
        <div className='my-3 flex flex-col'>
            <div className='flex justify-between' >
            
            <div className='flex flex-col'>
            <span data-testid = 'movie-title' className='font-bold'>{movieData.title}</span>
            <span data-testid = 'movie-release-date' className='mb-6'>Released on:{movieData.release_date}</span>
            </div>
            <button onClick={() => setSelected(!selected)} className={classNames('bg-slate-200 h-fit w-fit px-3',{
        'bg-rose-200': selected,
        'text-white' : selected
        })}>Favorite</button>
            </div>
            <span data-testid = 'movie-title'> Runtime: {movieData.runtime} minutes</span>
        </div>
        <span data-testid = 'overview' className='my-4'>{movieData.overview}</span>
        </div>
    </div>
        )}
    </div>
  )
}

export default Home