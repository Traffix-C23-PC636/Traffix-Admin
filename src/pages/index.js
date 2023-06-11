import {AiFillGoogleCircle} from "react-icons/ai";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import Head from "next/head";
import {useContext} from "react";
import {SessionContext} from "@/context/SessionProvider";
import login from "@/utils/firebase";



export default function Home() {
  const user = useContext(SessionContext);

  const router = useRouter()

  const handleSignInGoogle = async e => {
    e.preventDefault();
    await login().then(r =>{
      if (!r) {
        toast.error("Gagal Login, Gunakan Email Bangkit", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Login sukses, anda akan dialihkan..", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/admin");
      }
    })
  }
  return (
      <div>
        <Head>
          <title>Login Page</title>
        </Head>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                   alt="logo" />
              Traffix
            </div>
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/*<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">*/}
                {/*  Sign in to Admin Dashboard*/}
                {/*</h1>*/}
                {/*<form className="space-y-4 md:space-y-6" action="#">*/}
                {/*  <div>*/}
                {/*    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*/}
                {/*      Email</label>*/}
                {/*    <input disabled type="email" name="email" id="email"*/}
                {/*           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                {/*           placeholder="name@company.com" required=""></input>*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <label htmlFor="password"*/}
                {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>*/}
                {/*    <input disabled type="password" name="password" id="password" placeholder="••••••••"*/}
                {/*           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                {/*           required=""></input>*/}
                {/*  </div>*/}
                {/*  <button disabled type="submit"*/}
                {/*          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign*/}
                {/*    in*/}
                {/*  </button>*/}
                {/*</form>*/}
                <div className={"flex-col flex items-center justify-center"}>
                  {/*<div className="text-sm font-light text-gray-500 dark:text-gray-400">*/}
                  {/*  Or*/}
                  {/*</div>*/}
                  {/*<br />*/}
                  <button
                      className="flex items-center justify-center py-2 px-4 bg-red-600 text-white rounded-lg shadow-md" onClick={handleSignInGoogle}>
                    <AiFillGoogleCircle className={'mr-3'} size={20} />
                    Sign In with Google
                  </button>
                  <br/>
                  <span>Login dengan email bangkit</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
