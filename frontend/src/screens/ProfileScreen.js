import React , {useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Form , Button , Row , Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch , useSelector } from  'react-redux'
import { getUserDetails , updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

function ProfileScreen() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message , setMessage] = useState('')
    const dispatch = useDispatch();
    

    const userDetials = useSelector(state => state.userDetails) 
    const {error , loading , user} = userDetials
    

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
        else 
        {
            if(!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate , dispatch , userInfo , user , success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage("Password do not match")
        }
        else {
            dispatch(updateUserProfile({'id': user._id , 'name':name , 'email':email , 'password':password}))
            setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message> }
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label className='mb-1'>Name</Form.Label>
                        <Form.Control required className='mb-1' type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label className='mb-1'>Email Address</Form.Label>
                        <Form.Control required className='mb-1' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label className='mb-1'>Password</Form.Label>
                        <Form.Control className='mb-1' type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label className='mb-1'>Confirm Password</Form.Label>
                        <Form.Control className='mb-1' type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button className='mt-1' type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={3}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
