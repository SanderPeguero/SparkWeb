import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

import { ContextVariable } from '../../Context';

const Login = () => {
    const { alert, setalert, setauth, isOpenLogIn, setIsOpenLogIn, setIsOpenSignUp, setreserveTicket, locattion, user } = useContext(ContextVariable)

    const FirebaseAuth = getAuth()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);

    const handleLogIn = () => {
        signInWithEmailAndPassword(FirebaseAuth, email, password)
            .then((userCredential) => {

                // Signed in 
                const user = userCredential.user;
                setauth(user)
                setIsOpenLogIn(false)
                setalert({
                    ...alert,
                    open: true,
                    message: `Sesion Iniciada`,
                    severity: 'success'
                });
            })
            .catch((error) => {
                const errorMessage = error.message;

                setalert({
                    ...alert,
                    open: true,
                    message: `${errorMessage}`,
                    severity: 'error'
                });

            });
    }
    const handleCloseModal = (e) => {
        e.preventDefault()
        setIsOpenLogIn(false)
    }

    const handleOpenSignUp = (e) => {
        e.preventDefault()
        setIsOpenLogIn(false)
        setIsOpenSignUp(true)
    }
    const [location, setlocation] = useState(useLocation())

    const history = useNavigate();
    useEffect(() => {
        if (user && user.role === 'admin') {
            if (location.pathname === '/') {
                history("/admin")
            }
        }
    }, [user])
    return (
        <>
            {isOpenLogIn &&
                <div className="fixed  inset-0 flex items-center justify-center text-white z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-md"
                    onClick={(e) => handleCloseModal(e)}
                >
                    <div className="w-full lg:w-[30rem] md:w-[50%] px-4 mx-auto pt-6" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#100c28] border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className='mb-2 font-bold '>
                                    <div className='flex justify-between items-center '>
                                        <h2 className=" text-2xl font-semibold">Log In with</h2>
                                        <button
                                            onClick={(e) => handleCloseModal(e)}
                                            className='text-gray-500 hover:text-red-700 focus:outline-none'
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <hr className="mt-0 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
                                <div>
                                    <div className="relative w-full mb-3 ">
                                        <label className="block uppercase text-blue-Gray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                                        <input value={email} type="email" onChange={(e) => setemail(e.target.value)} className="border-0 px-3 py-3 text-black placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                        <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} className="border-0 px-3 py-3 text-black placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                                    </div>

                                    <div className="text-center mt-6">
                                        <button onClick={handleLogIn} className="group relative w-full px-6 py-3 overflow-hidden rounded shadow hover:shadow-lg bg-[#ba36ba] bg-gradient-to-r from-[#9340FF] to-[#FF3C5F] text-sm font-bold uppercase text-white my-4">
                                            Log In
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                        </button>
                                        Don't you have an account yet? <button className="hover:underline" onClick={(e) => handleOpenSignUp(e)}> Sign In</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Login;