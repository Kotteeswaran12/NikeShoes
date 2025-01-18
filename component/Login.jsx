/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'

const Login = ({ setLogin, setLoginSatus, loginSatus }) => {
    const [loginType, setLoginType] = useState("login")

    const [addUserDetails, setAddUserDetails] = useState(
        {
            'userName': '',
            'userEmail': '',
            'password': ''
        }
    )
    const [checkUser, setCheckUser] = useState({
        'userName': '',
        'password': ''
    })
    const [oldUser, setOldUser] = useState();
    const [old, setOld] = useState();
    const addUser = async () => {

        try {
            await axios.post("http://localhost:8080/users", {
                password: addUserDetails.password,
                userName: addUserDetails.userName,
                userEmail: addUserDetails.userEmail
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log("unable to fetch User" + error);
        }
        setAddUserDetails({
            'userName': '',
            'userEmail': '',
            'password': ''
        })
        console.log(addUserDetails);
        console.log("hello")
    }
    const checkUserDetails = async () => {
        try {
            let oguser = await axios.get(`http://localhost:8080/users/${checkUser.userName}/${checkUser.password}`)
            setLoginSatus(true)
            setOldUser([oguser.data]);
            setOld(oguser.data);
            if (oguser.status !== 500) {
                console.log("welcome bro")

            } else {
                console.log("unable to login")
            }



        } catch (error) {

            alert("User Not found plz try to Sign up" + error)
            setLogin(true)
            setLoginSatus(false)
            setLoginType("signin")
        }
    }
    // Effect to persist user state on page load
    useEffect(() => {
        if (oldUser) {
            // If oldUser is set, it means we have the user data and can render it
            console.log("User details loaded:", oldUser);
        }
    }, [oldUser]);

    const Ckeckoguser = () => {
        console.log(oldUser)
        console.log(old)
    }
    return (
        <>{loginSatus ?
            <div className="LoginMain">
                <div className="welcome">
                    <h1 className='WelcomeBack '>Welcome Back </h1>

                    {oldUser && oldUser.map((older) => (
                        <div className="formTamble" key={older.id}>
                            <h2 style={{
                                'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'
                            }}>User Name</h2> <input type="text" name="username" className='UserName' placeholder={older.userName} disabled style={{
                                "fontSize": '40px', 'color': 'black', 'fontWeight': "100", 'padding': "20px", 'border': 'none'
                            }} />
                            <h2 style={{
                                'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'
                            }}>Email</h2> <input type="email" name="useremail" className='UserEmail' placeholder={older.userEmail} disabled style={{
                                "fontSize": '40px', 'color': 'black', 'fontWeight': "100", 'padding': '20px', 'border': 'none'
                            }} />


                        </div>

                    ))
                    }
                    <div className="loginBtn " style={{
                        'width': '150%'
                    }}>
                        <button onClick={() => {Ckeckoguser(); setLoginSatus(true); setLogin(false)}}>Back To Shoping</button>
                    </div>


                </div>
            </div>

            :
            <div className="LoginMain">
                <div className="LoginForm">

                    <div className="UserType">
                        <h1 className={`Login${loginType === "login" ? "under" : ""}`} onClick={() => loginType !== "login" ? setLoginType("login") : ''} >Login</h1> <h1 className={`SignIn${loginType === "signin" ? "under" : ""}`} onClick={() => loginType !== "signin" ? setLoginType("signin") : ''}>SignIn</h1>
                    </div>
                    {
                        loginType == "login" ? <div className="tableForm">

                            <div className="formTambleLogin" >
                                <h2>User Name</h2> <input type="text" name="username" className='UserName' placeholder='Enter Your Name' value={checkUser.userName} onChange={(e) => setCheckUser({ ...checkUser, userName: e.target.value })} />

                                <h2>Password</h2> <input type="password" name="userpassword" className='UserPassword' placeholder='Enter Your Password' value={checkUser.password} onChange={(e) => setCheckUser({ ...checkUser, password: e.target.value })} />

                            </div>
                            <div className="loginBtn">
                                <button onClick={() => { checkUserDetails() }}>Login</button>

                            </div>
                        </div> : <div className="tableForm">

                            <div className="formTamble" >
                                <h2>User Name</h2> <input type="text" name="username" className='UserName' placeholder='Enter Your Name' value={addUserDetails.userName} onChange={(e) => setAddUserDetails({ ...addUserDetails, 'userName': e.target.value })} />
                                <h2>Email</h2> <input type="email" name="useremail" className='UserEmail' placeholder='Enter Your Email' value={addUserDetails.userEmail} onChange={(e) => setAddUserDetails({ ...addUserDetails, "userEmail": e.target.value })} />
                                <h2>Password</h2> <input type="password" name="userpassword" className='UserPassword' placeholder='Enter Your Password' value={addUserDetails.password} onChange={(e) => setAddUserDetails({ ...addUserDetails, "password": e.target.value })} />

                            </div>
                            <div className="loginBtn">
                                <button onClick={() => {
                                    addUser(); setLoginType("login")
                                }}>signup</button>
                            </div>
                        </div>
                    }

                </div>
            </div>}
        </>
    )
}

export default Login