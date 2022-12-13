import * as React from 'react';
import { Button,Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateBook , addComment, allBook } from '../redux/actions/bookAction';
import {useHistory, useParams} from 'react-router-dom';

const Preview = ({book, user , updateBook , addComment , allBook}) => {
    const {id} = useParams();
    const [title , setTitle] = React.useState("");
    const [author , setAuthor] = React.useState("");
    const [description , setDescription] = React.useState("");
    const [comments , setComments] = React.useState("");
    const [myComment , setMyComment] = React.useState("");
    const history = useHistory();

    React.useEffect(() => {
        allBook();
    } , [])
    React.useEffect(() => {
        if(book.books.length > 0){

                setTitle(book.books.filter(item => item._id == id)[0].title);
                setAuthor(book.books.filter(item => item._id == id)[0].author);
                setDescription(book.books.filter(item => item._id == id)[0].description);
                setComments(book.books.filter(item => item._id == id)[0].comments);
        }
    } , [book])
    return (
        <div>
            <h2 className='text-center my-5'>Preview</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange = {(e) => setTitle(e.target.value)} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={author} onChange = {(e) => setAuthor(e.target.value)}  disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange = {(e) => setDescription(e.target.value)}  disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Comments</Form.Label>
                    {
                        comments.length>0 &&comments.map((item , index) =>{
                            return (
                                <Form.Control type="text" value={item.email +" -------->  "+ item.comment} onChange = {(e) => setDescription(e.target.value)}  disabled/>
                            )
                        })
                    }
                </Form.Group>

                <hr />
                {(comments.length>0 &&comments.filter(item => item.email == user.user.email).length==0) || comments.length ==0?
                    <>
                        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                            <Form.Label>Your Comment</Form.Label>
                            <Form.Control type="text" value={myComment} onChange = {(e) => setMyComment(e.target.value)} disabled = {!user.isAuthenticated}/>
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="primary" type="submit" onClick={(e) => {e.preventDefault(); addComment({id , email:user.user.email , comment:myComment} , history) }} disabled = {!user.isAuthenticated}>
                                Leave Comment
                            </Button>
                        </div>
                    </>
                    :
                    ""
                }
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    book: state.book,
    user: state.user
});

export default connect(mapStateToProps , {addComment , allBook})(Preview);
