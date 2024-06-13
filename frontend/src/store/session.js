import csrfFetch from "./csrf"

const ADD_USER = "session/ADD_USER"
const REMOVE_USER = "session/REMOVE_USER"

const addUser = (user) => ({
  type: ADD_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER
})

export const login = user => async dispatch => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addUser(data.user));
    return res;
  }
}

const initialState = { user: JSON.parse(sessionStorage.getItem("currentUser")) }

const sessionReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: null}
    default:
      return state
  }
}

export default sessionReducer;