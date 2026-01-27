import './App.css'
import { ListOfMovies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch.js';
import { Spinner } from './components/Spinner.jsx';
import { useCallback, useState } from 'react'
import  debounce  from 'just-debounce-it'



function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading} = useMovies({ search, sort})





  const debouncedGetMovies = useCallback(  debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300),[])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (search === '') return
    getMovies({ search })
  }

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch) 
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    !sort ? setSort(true) : setSort(false)
  }


  return (
    <>

      <div className="page">
        <h1>Movie Finder</h1>
        <header className='search'>
          <form className='form' action="" onSubmit={handleSubmit}>
            <input style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} name='query' value={search} onChange={handleChange} placeholder='Avengers, Harry Potter, Fast and Furious' type="text" />
            <button>Search</button>
            <input type="checkbox" name="sort" id="sort" onChange={handleSort} checked={sort} />
            <label htmlFor="sort">Sort</label>
          </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>

        <main>
          {
            loading ? <Spinner/> : <ListOfMovies movies={movies} />
          } 
        </main>
      </div>

    </>
  )
}

export default App
