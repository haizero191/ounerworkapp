import { useEffect, useState } from "react";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION_LOGIN } from "../../redux/actions/user.action";
import "./Login.scss";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const [account, setAccount] = useState({
    studentID: "",
    password: ""
  })

  /* Get redux state */
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  /* Set cookies */
  useEffect(() => {
    if (state.user.data) {
      cookie.save("access-token", state.user.data.accessToken);
      cookie.save("studentID", state.user.data.user.id); 
      cookie.save("isApproved", state.user.data.user.isApproved); 
    }


  }, [state]);
  console.log(state.user)

  /*  Handle login form changed  */
  const onFieldChange = (event) => {
    setAccount({...account, [event.target.name]: event.target.value})
  }

  /*  Handle Login  */
  const login = async (e) => {
    e.preventDefault();
    dispatch(
      USER_ACTION_LOGIN({
        studentID: account.studentID,
        password: account.password,
      })
    );
  };

  if (state.user.data !== null) return <Navigate to="/" />;

  return (
    <div className="Login">
      <div className="login-container">
        <div className="login-container_left">
          <div className="login-form">
            <h2>Login</h2>
            <p className="subtitle">
              Đăng nhập thông tin của bạn để tham gia vào mạng xã hội của chúng
              tôi
            </p>
            <div className="login-form-input">
              {/* ID input */}
              <div className="field-input">
                <div className="icon">
                  <i class="bi bi-person-badge"></i>
                </div>
                <div className="input-value">
                  <input placeholder="Enter ID ..." name="studentID" onChange={onFieldChange}/>
                </div>
              </div>
              {/* Password input */}
              <div className="field-input">
                <div className="icon">
                  <i class="bi bi-file-lock2"></i>
                </div>
                <div className="input-value">
                  <input placeholder="Enter your password ..." type="password" name="password" onChange={onFieldChange}/>
                </div>
              </div>
            </div>

            <div className="login-valid" style={{ display: "none" }}>
              <div className="login-valid_field">
                <div className="check-icon">
                  <i class="bi bi-check"></i>
                </div>
                <p className="message">Student ID valid</p>
              </div>
              <div className="login-valid_field">
                <div className="check-icon">
                  <i class="bi bi-x"></i>
                </div>
                <p className="message">Incorrect password </p>
              </div>
            </div>

            <div className="login-btn" onClick={login}>Login</div>
          </div>
        </div>
        <div className="login-container_right">
          <div className="image">
            <img src="https://i.pinimg.com/originals/2b/09/97/2b0997961ff2f09aab18ac4c8c6dab02.jpg" />
          </div>
          <div className="content"></div>
        </div>
      </div>

      <Loading isLoading={state.user.isLoading}/>
    </div>
  );
};

const styles = {
  button: {
    background: "linear-gradient(to right, #5890FF, #1877F2)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    width: "225px",
  },
  logo: {
    width: "450px",
    margin: "20px 0 20px 20px",
  },
  h1: {
    fontFamily: "Grey Qo, cursive",
    marginTop: "150px",
  },
  formControl: {
    width: "100%",
  },
};

export default Login;
