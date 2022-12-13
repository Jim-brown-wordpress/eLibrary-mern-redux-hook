import axios from "axios"
import { CREATE_BOOK, DELETE_BOOK, RETRIEVE_BOOK, UPDATE_BOOK , ALL_BOOK, CLEAR_ERROR, SET_ERROR, ADD_COMMENT } from "./type";


export const allBook = () => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.get('http://localhost:4000/book/')
        .then(res => {
            console.log(res.data);
            dispatch({type: ALL_BOOK , payload: res.data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const retrieveBook = () => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.get('http://localhost:4000/book')
        .then(res => {
            console.log(res.data);
            dispatch({type: RETRIEVE_BOOK , payload: res.data})
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const createBook = (data , history) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post('http://localhost:4000/book/create-book' , {...data})
        .then(res => {
            dispatch({type: CREATE_BOOK , payload: res.data})
            history.push('/manage');
            // }
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}


export const updateBook = (data , history) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.put(`http://localhost:4000/book/update-book/${data.id}` , {...data})
        .then(res => {
            dispatch({type: UPDATE_BOOK , payload: res.data})
            history.push('/manage');
            // }
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const deleteBook = (data , history) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.delete(`http://localhost:4000/book/delete-book/${data.id}`)
    .then(res => {
            dispatch({type: DELETE_BOOK , payload: data})
            history.push('/manage');
            // }
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
}

export const addComment = (data , history) => dispatch => {
    dispatch({type:CLEAR_ERROR});
    axios.post(`http://localhost:4000/book/add-comment` , {...data})
    .then(res => {
        console.log(data)
            dispatch({type: ADD_COMMENT , payload: data})
            // history.push('/manage');
            // }
        })
        .catch(err => {
            dispatch({type:SET_ERROR , payload: err.response.data})
        });
    // })
}



