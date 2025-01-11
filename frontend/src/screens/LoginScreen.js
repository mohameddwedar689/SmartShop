import React , {useState , useEffect} from 'react'
import { Link , useLocation , useNavigate } from 'react-router-dom'
import { Form , Button , Row , Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch , useSelector } from  'react-redux'
import { login } from '../actions/userActions'

function LoginScreen() {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error , loading , userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate , userInfo , redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email , password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label className='mb-1'>Email Address</Form.Label>
                    <Form.Control className='mb-1' type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label className='mb-1'>Password</Form.Label>
                    <Form.Control className='mb-1' type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='mt-1' type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
