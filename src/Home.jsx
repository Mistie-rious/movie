import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from './assets/tv.png'
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
        <nav className='flex flex-col'>
        <div className='flex'>
            <img src={logo}></img>
            <span>Moviebox</span>
        </div>
        </nav>
    </div>
  )
}

export default Home