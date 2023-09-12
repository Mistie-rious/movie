import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from './assets/tv.png'
import home from './assets/home.png'
import show from './assets/TVshow.png'
import projector from './assets/Projector.png'
import calendar from './assets/Calendar.png'
import logout from './assets/Logout.png'

function Home() {

  const apiKey = '56b10ced2747113175093596cb0982d5'
  const [movieData, setMovieData] = useState(null)
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

        let backdropImage = null;

        if (movieData && movieData.backdrop_path) {
          backdropImage = `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`;
        }
  return (
    <div className='flex my-6 mx-9 gap-5'>
        <nav className='flex w-[226px] border-3 border-black h-screen justify-between flex-col'>
        <div className='flex'>
            <img src={logo}></img>
            <span>Moviebox</span>
        </div>
        <div className='flex'>
            <img src={home}></img>
            <span>Home</span>
        </div>
        <div className='flex'>
            <img src={show}></img>
            <span>TV Show</span>
        </div>
        <div className='flex'>
            <img src={calendar}></img>
            <span>Upcoming</span>
        </div>
        <div>Play movie tickets</div>
        <div className='flex'>
            <img src={backdropImage}></img>
        </div>
        </nav>
        <div>
        <div>
            <img src={backdropImage} className='w-[1198px] h-[400px] rounded-[20px]'></img>
        </div>
        <div className='flex flex-col'>
            <span>Title: {movieData.title}</span>
            <span> Release Date:{movieData.release_date}</span>
            <span> Runtime: {movieData.runtime}</span>
        </div>
        <span>{movieData.overview}</span>
        </div>
    </div>
  )
}

export default Home