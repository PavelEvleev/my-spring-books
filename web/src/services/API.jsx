import axios from 'axios';

const serverUrl = "https://peaceful-waters-96928.herokuapp.com/"
// const serverUrl = "http://localhost:8080/";
export const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export const set_cookie = (name, value, date, refreshToken) => {
  let d = new Date()
  d.setTime(d.getTime() + date * 60)
  let expires = "expires=" + d.toGMTString();
  let AuthStr = 'Bearer ' + value;
  axios.defaults.headers.common['Authorization'] = AuthStr;
  document.cookie = name + '=' + value + ';' + expires + ';Path=/;';
  document.cookie = "refresh_token" + '=' + refreshToken + ';' + ';Path=/;';
}

export const delete_cookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export let DEFAULT_HTTP_HEADERS = {
  'Content-Type': 'application/json',
}

export const validateStatus = (status) => {
  return status >= 200 && status < 300
}

export const client = axios.create({
  baseURL: serverUrl,
  headers: DEFAULT_HTTP_HEADERS,
  validateStatus: validateStatus
})

export const clientForLogin = axios.create({
  baseURL: serverUrl,
  headers: { "Content-type": "application/x-www-form-urlencoded; charset=utf-8" },
  validateStatus: validateStatus
})

export const updateAuth = () => {
  clientForLogin.defaults.auth = { username: 'my-trusted-client', password: 'secret' }
}

export const refreshTokenRequest = (refresh_token) => {
  var params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refresh_token);
  updateAuth();
  return clientForLogin.post('oauth/token', params)
}

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    console.log("Silent token renew");
    originalRequest._retry = true;
    const refreshToken = getCookie("refresh_token");
    return refreshTokenRequest(refreshToken).then(({ data }) => {
      set_cookie("key", data.access_token, data.expires_in, data.refresh_token);
      originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
      return client(originalRequest);
    });
  }
  return Promise.reject(error);
});





/*
 * API endpoint to fetch all user books.
 */
export const fetchBooks = () => {
  return client.get(`/v1/books`)
}

export const addComment = (c) => {
  return client.post('/v1/books/comment', c)
}

export const fetchAuthors = () => {
  return client.get('/v1/authors')
}

export const fetchGenres = () => {
  return client.get('/v1/books/genres')
}

export const fetchUsers = () => {
  return client.get('/v1/users')
}

export const removeBookFromUser = (userId, bookId) => {
  return client.patch('/v1/users/' + userId + '/books/' + bookId)
}

export const test = (p) => {
  return client.get('/v1/users/findNames/' + p);
}

export const fetchUser = (id) => {
  return client.get('/v1/users/' + id)
}

export const fetchBook = (id) => {
  return client.get(`v1/books/${id}`)
}

export const fetchEmail = (email) => {
  return client.post('/v1/users/findEmail', email);
}
export const CreateAuthor = (name) => {
  return client.post('/v1/authors', name);
}

export const addBooksToUser = (books) => {
  return client.post('/v1/users/' + books.userId, books);
}

export const DeleteAuthor = (id) => {
  return client.delete('/v1/authors/' + id);
}

export const CreateBook = (book) => {
  return client.post('/v1/books', book);
}

export const DeleteBook = (id) => {
  return client.delete('/v1/books/' + id);
}

export const CreateUser = (user) => {
  return client.post('/v1/users', user);
}

export const DeleteUser = (id) => {
  return client.delete('/v1/users/' + id);
}



export const LoginOuath = (email, password) => {
  var params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', email);
  params.append('password', password);
  updateAuth()
  return clientForLogin.post('oauth/token', params)
}



export const Login = (username, password) => {
  updateAuth(username, password)
  return client.get('/v1/users/login')
}

export const logout = (user) => {
  return client.post('oauth/revoke-token', user)
}

export const removeCredentials = () => {
  delete_cookie('key')
  delete_cookie('refresh_token')
  localStorage.clear()
  client.defaults.auth = null
}

export const searchBooks = (searchBook) => {
  return client.post('/v1/books/search', searchBook)
}


export const toggleLikeBook = (likedBook) => {
  return client.post("/v1/books/toggle_rating", likedBook)
}

export const changeAvatar = (img) => {
  return client.post('/v1/img/change_avatar', img)
}


/*
 * API endpoint for admin requests.
 */

export const patchBook = (book) => {
  return client.post(`/v1/books/admin`, book)
}

export const adminGetBooks = () => {
  return client.get('/v1/books/admin/all')
}

export const adminGetBook = (id) => {
  return client.get(`/v1/books/admin/${id}`)
}

export const adminGetAuthors = () => {
  return client.get('/v1/authors/admin/all')
}

export const adminGetAuthor = (id) => {
  return client.get(`/v1/authors/${id}`)
}

export const patchAuthor = (a) => {
  return client.post(`/v1/authors/admin/edit`, a)
}

export const adminGetComments = () => {
  return client.get('/v1/books/admin/comment/all')
}

export const adminToggleApproveComment = (c) => {
  return client.post('/v1/books/admin/comment/approve', c)
}