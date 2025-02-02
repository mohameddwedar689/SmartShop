import React , {useState , useEffect} from 'react'
import { Link , useLocation , useNavigate, useParams } from 'react-router-dom'
import { Form , Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch , useSelector } from  'react-redux'
import { getUserDetails , updateUser } from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

function UserEditScreen() {
    const { id } = useParams();
    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [isAdmin , setAdmin] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const userDetails = useSelector(state => state.userDetails)
    const {error , loading , user} = userDetails
    
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate , loading: loadingUpdate , success: successUpdate} = userUpdate
    

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }
        else {
            if( !user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id))
            }
            else {
                setName(user.name)
                setEmail(user.email)
                setAdmin(user.isAdmin)
            }
        }
    }, [user , id , successUpdate , navigate , dispatch]) 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id:user._id , name , email , isAdmin}))
    }


    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label className='mb-1'>Name</Form.Label>
                                    <Form.Control className='mb-1' type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label className='mb-1'>Email Address</Form.Label>
                                    <Form.Control className='mb-1' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='isadmin'>
                                    <Form.Check className='mb-1' type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)}></Form.Check>
                                </Form.Group>

                                <Button className='mt-1' type='submit' variant='primary'>Update</Button>
                            </Form>
                        )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
