import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import classNames from 'classnames';

function Card({ title, releasedate, backdrop, info }) {
  const backdropp = `https://image.tmdb.org/t/p/original/${backdrop}`;
const [selected, setSelected] = useState(false)
const [loading, setLoading] = useState(true);
  return (
    <div className=''>
      <div data-testid='movie-card'>
        <Link to={`/movie/${info.id}`}>
          <img
            src={backdropp}
            className='max-md:h-[200px] max-md:w-[200px] h-[250px] w-[250px]'
            data-testid='movie-poster'
            alt='Movie Poster'
          />
          <div data-testid='movie-title' className='font-bold text-[18px]'>
            {title}
          </div>
        </Link>
        <div data-testid='movie-release-date'>Released: {releasedate}</div>
        <button onClick={() => setSelected(!selected)} className={classNames('bg-slate-200 w-fit px-3',{
        'bg-rose-200': selected,
        'text-white' : selected
        })}>Favorite</button>
      </div>
    </div>
  );
}

export default Card;
