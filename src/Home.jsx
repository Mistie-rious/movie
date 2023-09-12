import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from './assets/tv.png'
import home from './assets/home.png'
import show from './assets/TVshow.png'
import projector from './assets/Projector.png'
import calendar from './assets/Calendar.png'

function Home() {
    
  const apiKey = '56b10ced2747113175093596cb0982d5'
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
            console.log(data)
        })

        .catch (error => {
            console.error('Catch error', error)
        })
  return (
    <div>
        <nav className='flex w-[226px] flex-col'>
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
            <img src=''></img>
        </div>
        </nav>
        <div></div>
    </div>
  )
}

export default Home