const apiKey = 'c7a83e07' // this should be handle on back end for security reasons
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=`
const typeSearch = 'movie'

export const searchMovies = async ({ search }) => {

    if (search === '') return

    try {

        const response = await fetch(apiUrl + search + '&type=' + typeSearch)
        const json = await response.json()
        const jsonResponse = json.Response

        if (jsonResponse) {
            const movies = json.Search
            //in some cases the API has duplicate records, this map remove it
            const removeDuplicates = [
                ...new Map(movies.map(movie => [movie.imdbID, movie])).values()]

            return removeDuplicates
        } else if (jsonResponse === 'False') {
            throw new Error(jsonResponse.Error)
        }
    } catch (error) {
        throw new Error(error.message)

    }
}
