import { useEffect, useState } from 'react'

import './App.css'
import Card from './Card'
import tomato from './assets/tomato.png'
import imdb from './assets/IMDB.png'
function App() {
  
  const [search, setSearch] = useState("")
  const [url, setUrl] = useState("")
  const [top10Movies, setTop10Movies] = useState([])

  const apiKey = '56b10ced2747113175093596cb0982d5'
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmIxMGNlZDI3NDcxMTMxNzUwOTM1OTZjYjA5ODJkNSIsInN1YiI6IjY0ZmU3Y2RjZmE0MDQ2MDBlMTdlYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VaYdMJHAFK3NqbAlpY7YyY38XOaubJAT27HyuUR4qE4'
  

  const handleSubmit = (e) =>  {
    e.preventDefault();
    console.log(search)
    setSearch("")
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  };
  useEffect(() => {
 fetch('https://api.themoviedb.org/3/movie/top_rated', options)
    .then(response => response.json())
    .then(response => {

      if(response.results){
        const top10Movies = response.results.slice(0, 10);
        console.log(top10Movies); 
        setTop10Movies(top10Movies);
  }
  else{
    console.log("Can't fetch API")
  }
})
    .catch(err => console.error(err));

  }, [])

    
  return (



    <>
    <div>
      <div className='min-h-screen  bg-johnwick mb-[20px] max-h-fit'>

      <nav className='flex  justify-around   items-center'>
        <div className='flex  '>
      <img src='./src/assets/tv.png'/>
      <p className='ml-[24px] font-bold text-[24px] text-white'>Moviebox</p>
      </div>
        <form onSubmit={handleSubmit} className='flex justify-center'>
          <input onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='What do you want to watch?'
           className=' w-[525px]  bg-transparent text-white px h-[36px] rounded-[6px] border-2'/>
          <button 
          type='submit'
          className='-m-4'
          >
            <img src='./src/assets/Search.png'/>
          </button>
          </form >
          <div className='flex '>
            <p className='font-bold text-[16px] text-white'>Sign in</p>
            <img src='./src/assets/Menu.png' className=' ml-[27px] w-[24px] h-[24px]'></img>
          </div>
        
      </nav>
      <div className='flex flex-col text-white                 w-[404px] my-[125px] mx-[82px]'>
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
        <div className="grid grid-cols-3  gap-[80px]">
  {top10Movies.map((info) => (
    <Card
      key={info.id}_
      title={info.title}
      releasedate={info.release_date}
      backdrop={info.backdrop_path}
    />
  ))}
</div>



      </div>
      </div>
    </>
 
  )
}

export default App
