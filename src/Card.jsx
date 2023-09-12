import React from 'react'

function Card({title, releasedate, backdrop}) {
 const backdropp = `https://image.tmdb.org/t/p/original/${backdrop}`
  return (
    
        <div className=''>
          <div data-testid = 'movie-card'>
          <img src={backdropp} className=' h-[370px] w-[300px]'  data-testid="movie-poster" alt="Movie Poster" />

            <div data-testid = 'movie-title' className='font-bold text-[18px]'>{title}
            </div>
            <div data-testid = 'movie-release-date'>{releasedate} </div>
             </div>
        </div>
    
  )
}

export default Card