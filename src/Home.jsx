import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
function Home() {
    
  const apiKey = '56b10ced2747113175093596cb0982d5'
    const { id } = useParams(); 
    fetch(`https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}`)
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
    <div>Home</div>
  )
}

export default Home