import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/user";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (emailValidate == "mostrar" && emailValidate == "mostrar") {
      dispatch(login({ email: email, password: password })).then((data) => {
 
        if (data.meta.requestStatus === "rejected") {
          setPassword("");
          return swal("User or password incorrect!");
        }

        if (data.payload) {
          localStorage.setItem("token", data.payload.token);
          history.push("/");
          swal("Logged in!");
        }
      });
    } else {
      swal("Put in value data!");
    }
  };

  //   Validaciones
  const [emailValidate, setEmailValidate] = useState("inicial");
  const [passwordValidate, setPassworsdValidate] = useState("inicial");

  const requeridoEmail = (e) => {
    let expresion = /\w+@\w+\.[a-z]/;
    //     \w (es texto)
    //     \. (es punto)
    if (email != "" && expresion.test(email)) {
      setEmailValidate("mostrar");
    } else {
      // el input esta vacio
      setEmailValidate("nomostrar");
    }
  };

  const requeridoPassword = (e) => {
    
    if (password != "") {
      setPassworsdValidate("mostrar");
    } else {
      // el input esta vacio
      setPassworsdValidate("nomostrar");
    }
  };
 
  return (
    <>
      <div className="row no-gutters wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                id="email_field"
                className={` form-control ${
                  emailValidate == "inicial"
                    ? ""
                    : emailValidate == "mostrar"
                    ? "is-valid "
                    : "is-invalid"
                }             
                    `}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={requeridoEmail}
              />
              <div className="invalid-feedback">Enter a VALID email</div>
              <div className="valid-feedback">It´s OK , continue.</div>
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className={` form-control ${
                  passwordValidate == "inicial"
                    ? ""
                    : passwordValidate == "mostrar"
                    ? "is-valid "
                    : "is-invalid"
                }             
                    `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={requeridoPassword}
              />
              <div className="invalid-feedback">Enter a VALID password</div>
              <div className="valid-feedback">It´s OK , continue.</div>
            </div>

            <Link to="/password/forgot" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
