import React, { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import auth, { login } from "../../../firebase";
import {
  setEmail,
  setEmailFocus,
  setErrMsg,
  setPassFocus,
  setPwd,
  validateEmail,
  validatePass,
  validatePassLogin,
} from "../../app/features/userSlice/userSlice";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Button, Input } from "../../components";
import { useAuthState } from "react-firebase-hooks/auth";
import { setLoading } from "../../app/features/booksSlice/booksSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["uid", "token"]);
  const [user, isLoading] = useAuthState(auth);

  const email = useSelector((state) => state.user.email);
  const validEmail = useSelector((state) => state.user.validEmail);
  const password = useSelector((state) => state.user.pwd);
  const validPassLogin = useSelector((state) => state.user.validPwdLogin);
  const errMsg = useSelector((state) => state.user.errMsg);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    dispatch(validateEmail(email));
  }, [email]);
  useEffect(() => {
    dispatch(validatePassLogin(password));
  }, [password]);
  useEffect(() => {
    dispatch(setErrMsg(""));
  }, [email, password]);
  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    }
    if (user) {
      dispatch(setLoading(false));
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate1 = dispatch(validateEmail(email));
    const validate2 = dispatch(validatePass(password));
    if (!validate1 || !validate2)
      dispatch(setErrMsg("Please fill the form correctly"));
    try {
      const user = await login(email, password);
      const { uid, accessToken } = user;
      setCookies("uid", uid, { path: "/" });
      setCookies("token", accessToken, { path: "/" });
    } catch (error) {
      dispatch(setErrMsg("Email/Password is invalid"));
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-700 to-pink-900 h-screen w-screen flex justify-center items-center">
      <div className="register w-4/5 max-w-md bg-sky-700 rounded-xl px-6 py-6 text-white shadow-lg shadow-slate-700">
        <p
          ref={errRef}
          className={
            errMsg
              ? "text-base font-commisioner text-center bg-red-500 rounded-lg font-bold px-4 py-2 transition-all duration-300 flex items-center justify-around mb-6"
              : "fixed -top-[1024px] transition-all duration-300"
          }
          aria-live="assertive"
        >
          {errMsg}{" "}
          <span>
            <BsFillExclamationTriangleFill />
          </span>
        </p>
        <h1 className="text-4xl font-merriewether mb-7">Login</h1>
        <form className="flex flex-col gap-7 mt-16" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            reff={userRef}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            describedby="emailnote"
            onFocus={() => dispatch(setEmailFocus(true))}
            onBlur={() => dispatch(setEmailFocus(false))}
            placeholder="Email"
            value={email}
          >
            Email
          </Input>
          <div className="password">
            <Input
              type="password"
              id="password"
              reff={userRef}
              onChange={(e) => dispatch(setPwd(e.target.value))}
              invalid={validPassLogin ? "false" : "true"}
              describedby="passnote"
              onFocus={() => dispatch(setPassFocus(true))}
              onBlur={() => dispatch(setPassFocus(false))}
              placeholder="Password"
              value={password}
            >
              Password
            </Input>
          </div>
          <div className="submit z-10 self-center">
            <Button disable={!validEmail || !validPassLogin ? true : false}>
              Login
            </Button>
            <p className="text-center italic text-sm mt-2">
              Don't have account?{" "}
              <Link to="/register" className="font-semibold z-10">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
