import { useRef, useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import APIs, { endpoints } from "../configs/APIs";


const Register = () => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState();
    const nav = useNavigate();
    const avatar = useRef();

    const register = async (e) => {
        e.preventDefault();

        if (user.password === undefined || user.password !== user.confirm)
            setErr("Mật khẩu KHÔNG khớp!");
        else {
            let form = new FormData();
            for (let f in user)
                if (f !== 'confirm') {
                    form.append(f, user[f]);
                }
            try {
                const res = await APIs.post(endpoints["register"], form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.info(res.data);
                nav("/login");
            } catch (ex) {
                if (ex.response && ex.response.data && ex.response.data.errors) {
                    setErr(ex.response.data.errors.join(", "));
                  } else {
                    console.error(ex);
                  }
            }
        }
    }

    const change = (e, field) => {
        setUser({ ...user, [field]: e.target.value })
    }

    return (<>
        <h1 className="text-center" style={styles.h1}>Register</h1>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form method="post" onSubmit={register} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: "500px" }}>
                <FloatingLabel className="mt-3 mb-3" trolId="floatingInput" label="Student Email" style={styles.formControl} value={user["email"]} onChange={e => change(e, "email")}>
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel className="mt-3" controlId="floatingPassword" label="Password" style={styles.formControl} value={user["password"]} onChange={e => change(e, "password")}>
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <FloatingLabel className="mt-3" controlId="floatingConfirmPassword" label="Confirm Password" style={styles.formControl} value={user["confirm"]} onChange={e => change(e, "confirm")}>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </FloatingLabel>
                <FloatingLabel className="mt-3" controlId="floatingStudentId" label="Student Id" style={styles.formControl} value={user["studentID"]} onChange={e => change(e, "studentID")}>
                    <Form.Control type="number" placeholder="Student Id" />
                </FloatingLabel>
                <div className="text-center mt-3 mb-3" style={styles.formControl}>
                    <Button style={styles.button} type="submit" >Đăng Ký</Button>
                </div>
            </div>

        </Form>
    </>)

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

export default Register;