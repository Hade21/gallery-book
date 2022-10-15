import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import auth, { register } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  setEmail,
  setEmailFocus,
  setErrMsg,
  setMatch,
  setMatchFocus,
  setPassFocus,
  setPwd,
  validateEmail,
  validateMatch,
  validatePass,
} from "../../app/features/userSlice/userSlice";
import {
  BsFillExclamationTriangleFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import { Button, Input } from "../../components";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, isLoading] = useAuthState(auth);
  const [cookies, setCookies] = useCookies(["uid", "token"]);

  const email = useSelector((state) => state.user.email);
  const validEmail = useSelector((state) => state.user.validEmail);
  const password = useSelector((state) => state.user.pwd);
  const validPass = useSelector((state) => state.user.validPwd);
  const passFocus = useSelector((state) => state.user.pwdFocus);
  const matchPwd = useSelector((state) => state.user.matchPwd);
  const validMatch = useSelector((state) => state.user.validMatch);
  const matchFocus = useSelector((state) => state.user.matchFocus);
  const errMsg = useSelector((state) => state.user.errMsg);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    dispatch(validateEmail(email));
  }, [email]);
  useEffect(() => {
    dispatch(validatePass(password));
    dispatch(validateMatch());
  }, [password]);
  useEffect(() => {
    dispatch(setErrMsg(""));
  }, [email, password, matchPwd]);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user) {
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
      const user = await register(email, password);
      const { uid, accessToken } = user;
      setCookies("uid", uid, { path: "/" });
      setCookies("token", accessToken, { path: "/" });
    } catch (error) {
      console.log(error);
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
        <h1 className="text-4xl font-merriewether mb-7">Register</h1>
        <form className="flex flex-col gap-9 mt-16" onSubmit={handleSubmit}>
          <div className="email">
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
              valid={validEmail}
            >
              Email
            </Input>
          </div>
          <div className="password">
            <Input
              type="password"
              id="password"
              reff={userRef}
              onChange={(e) => dispatch(setPwd(e.target.value))}
              invalid={validPass ? "false" : "true"}
              describedby="passnote"
              onFocus={() => dispatch(setPassFocus(true))}
              onBlur={() => dispatch(setPassFocus(false))}
              placeholder="Password"
              value={password}
              valid={validPass}
            >
              Password
            </Input>
            <p
              id="passnote"
              className={
                passFocus && !validPass && password
                  ? "transition-all duration-500 bg-black text-[10px] text-left border-2 border-white rounded-lg mt-1 p-2 w-5/6 mx-auto opacity-100"
                  : "w-1/2 mx-auto h-1/2 text-left opacity-0 text-[0px] transition-all duration-500"
              }
            >
              <BsInfoCircleFill />
              <span>
                8 to 24 characters. <br /> Must include uppercase and lowercase
                letters, numbers, and special characters. <br />
                Allowed special characters:
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at mark">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </span>
            </p>
          </div>
          <div className="confirm">
            <Input
              type="password"
              id="matchPwd"
              reff={userRef}
              onChange={(e) => dispatch(setMatch(e.target.value))}
              invalid={validMatch ? "false" : "true"}
              describedby="confnote"
              onFocus={() => dispatch(setMatchFocus(true))}
              onBlur={() => dispatch(setMatchFocus(false))}
              placeholder="Confirm Password"
              valid={validMatch}
              value={matchPwd}
            >
              Confirm Password
            </Input>
            <p
              id="confnote"
              className={
                matchFocus && !validMatch && matchPwd
                  ? "transition-all duration-500 bg-black text-[10px] text-left border-2 border-white rounded-lg mt-1 p-2 w-5/6 mx-auto opacity-100"
                  : "w-1/2 mx-auto h-1/2 text-left opacity-0 text-[0px] transition-all duration-500"
              }
            >
              <BsInfoCircleFill />
              <span>Password didn't match</span>
            </p>
          </div>
          <div className="submit z-10 self-center">
            <Button
              disable={!validEmail || !validPass || !validMatch ? true : false}
            >
              Register
            </Button>
            <p className="text-center italic text-sm mt-2">
              Already have account?{" "}
              <Link to="/login" className="font-semibold z-10">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
