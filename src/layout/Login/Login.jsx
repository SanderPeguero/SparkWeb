import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import { ContextVariable } from '../../Context';

const Login = () => {
    const { alert, setalert, setauth, isOpenLogIn, setIsOpenLogIn, setIsOpenSignUp,setreserveTicket,locattion } = useContext(ContextVariable)

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

    // setIsSignUp
    const handleOpenSignUp = (e) => {
        e.preventDefault()
        setIsOpenLogIn(false)
        setIsOpenSignUp(true)
    }
    return (
        <>
            {isOpenLogIn &&
                // mb-[20rem] mt-[4rem]
                <div className="fixed  inset-0 flex items-center justify-center z-50 mx-8 sm:mx-0 min-h-screen w-full backdrop-blur-md"
                    onClick={(e) => handleCloseModal(e)}
                >
                    {/* El onClick es para cerrar el modal en la parte que se vez borroso */}
                    <div className="w-full lg:w-[30rem] md:w-[50%] px-4 mx-auto pt-6" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[rgba(248,250,252)] border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className=' px-5 py-7 font-bold'>
                                    <div className='flex justify-between items-center '>
                                        <h2 className="text-2xl font-semibold">Log In with</h2>
                                        <button
                                            onClick={(e) => handleCloseModal(e)}
                                            className='text-gray-500 hover:text-gray-700 focus:outline-none'
                                        >
                                            {/* //BOTON X */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                    {/* <hr className='w-80 border-b border-gray-300  mt-4' /> */}

                                </div>

                                {/* <div className="text-center mb-3">
                                    <button></button>
                                    <h1 className="text-blueGray-500 text-md font-bold">
                                        Log In with
                                    </h1>
                                </div> */}
                                {/* <div className="btn-wrapper text-center">
                            <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" />Github</button>
                            <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button">
                                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>

                        </div> */}
                                <hr className="mt-3 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
                                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                            <small>Or sign in with credentials</small>
                        </div> */}
                                <div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                                        <input value={email} type="email" onChange={(e) => setemail(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                                        <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                                    </div>
                                    {/* <div>
                                <label className="inline-flex items-center cursor-pointer"><input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" /><span className="ml-2 text-sm font-semibold text-blueGray-600">Remember me</span></label>
                            </div> */}
                                    <div className="text-center mt-6">
                                        <button onClick={handleLogIn} className="group relative w-full px-6 py-3 overflow-hidden rounded shadow hover:shadow-lg bg-[#3d36ba] text-sm font-bold uppercase text-white my-4">
                                            Log In
                                            <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                        </button>
                                        Don't you have an account yet? <button onClick={(e) => handleOpenSignUp(e)}> Sign In</button>

                                        {/* <p className="mt-4 text-sm">Dont Have An Account Yet? <Link to='/signin' className="underline cursor-pointer"> Sign In</Link></p> */}
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