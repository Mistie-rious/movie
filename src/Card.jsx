import React from 'react'

function Card({title, releasedate, backdrop}) {
 const backdropp = `https://image.tmdb.org/t/p/original/${backdrop}`
  return (
    
        <div className=''>
          <div data-testid = 'movie-card'>
          <img src={backdropp} className=' max-md:h-[200px] max-md:w-[200px] h-[250px] w-[250px]'  data-testid="movie-poster" alt="Movie Poster" />

            <div data-testid = 'movie-title' className='font-bold text-[18px]'>{title}
            </div>
            <div data-testid = 'movie-release-date'>Released: {releasedate} </div>
             </div>
        </div>
    
  )
}

export default Card