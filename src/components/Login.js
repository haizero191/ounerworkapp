import { useContext, useState } from "react";
import cookie from "react-cookies";
import { MyDispatchContext, MyUserContext } from "../App";
import APIs, { endpoints } from "../configs/APIs";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";


const Login = () => {
    const [studentID, setStudentID] = useState();
    const [password, setPassword] = useState();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    const login = async (e) => {
        e.preventDefault();

        try {
            let res = await APIs.post(endpoints['login'], {
                "studentID": studentID,
                "password": password
            });

            cookie.save("access-token", res.data.token);
            cookie.save("studentID", studentID);
            

            dispatch({
                "type": "login",
                "payload": {
                    "studentID": studentID,
                    "token": res.data.token
                }
            });
            console.info(res.data);

        } catch (ex) {
            console.log(ex);
        }
    }

    if (user !== null) return <Navigate to="/" />

    return (<>
        <h1 className="text-center mb-3" style={styles.h1}>Ou Network</h1>
        <Form method="post" onSubmit={login} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '500px'}}>
                <FloatingLabel controlId="floatingInput" label="Student ID" className="mb-3">
                    <Form.Control type="text" placeholder="Student ID" value={studentID} onChange={e => setStudentID(e.target.value)} style={styles.formControl} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.formControl} />
                </FloatingLabel>
                <div className="mt-1 mb-3 d-flex justify-content-between">
                    <Link to="/forgot">Forgot Password?</Link>
                    <div>Don't have an account? <Link to='/register'>Sign Up</Link></div>  
                </div>
                <FloatingLabel className="text-center mt-3 mb-3">
                    <Button type="submit" variant="success" style={styles.button}>Login</Button>
                </FloatingLabel>
            </div>
        </Form>
    </>
    );
}

const styles = {
    button: {
        background: 'linear-gradient(to right, #5890FF, #1877F2)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '225px',
    }, logo: {
        width: "450px",
        margin: "20px 0 20px 20px",
    }, h1: {
        fontFamily: "Grey Qo, cursive",
        marginTop: '150px',
    }, formControl: {
        width: '100%'
    }
};

export default Login;