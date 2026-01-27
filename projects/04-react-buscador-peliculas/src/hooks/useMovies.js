import { useState, useRef, useMemo } from 'react'
import { searchMovies } from '../services/movies'

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)



  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if ( search === previousSearch.current) return

      try {
        setLoading(true)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setMovies([])
        throw new Error(error);
      }
      finally {
        setLoading(false)
      }
    }
  }, [])



  const sortedMovies = useMemo(() => {
    return sort ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title)) : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }

}