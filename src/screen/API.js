export const API_KEY = "?api_key=90bb3764c9321cec09a9d576cf929c61"
export const ENDPOINT = "https://api.themoviedb.org/3/"
export const MOVIE_BY_GENRES = (genreId) =>  {
    return ENDPOINT+"discover/movie"+API_KEY+"&with_genres="+genreId
}

export const API_REGISTER = "https://be-kickin.herokuapp.com/api/v1/user/register"
export const API_LOGIN = "https://be-kickin.herokuapp.com/api/v1/user/login"
export const API_USER = "https://be-kickin.herokuapp.com/api/v1/user"
export const API_PASSWORD = ""