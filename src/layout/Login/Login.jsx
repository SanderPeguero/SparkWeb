import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
// import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState();

    // const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }


    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }


    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    return (
        <div>
            {
                user ? null :
                    // <>
                        <div className="min-h-screen bg-[#120c32]  flex justify-center items-center">
                            <div className="absolute w-60 h-60 rounded-xl bg-[#090520]  top-[9rem] -left-16 z-0 transform rotate-45 hidden md:block">
                            </div>
                            <div className="absolute w-48 h-48 rounded-xl bg-[#090520]  -bottom-6 -right-10 transform rotate-12 hidden md:block">
                            </div>
                            <div className="py-12 px-7 bg-white rounded-2xl shadow-xl z-20">
                                <div>
                                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Create An Account</h1>
                                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
                                        account to enjoy all the services without any ads for free!</p>
                                </div>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Email Addres" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                                    <input type="text" placeholder="Password" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                                </div>
                                <div className="text-center mt-6">
                                    <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Create Account</button>
                                    <p className="mt-4 text-sm">Already Have An Account? <span className="underline cursor-pointer"> Sign In</span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-40 h-40 absolute bg-[#090520] rounded-full top-[9rem] right-12 hidden md:block"></div>
                            <div
                                className="w-20 h-40 absolute bg-[#090520]  rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
                            </div>
                        </div>
                    // </> : null
            }
            {user && <div>
                <h3>
                    User: {user.displayName}
                </h3>
                <p>Email: {user.email}</p>
            </div>}
        </div>
    );
};

export default Login;