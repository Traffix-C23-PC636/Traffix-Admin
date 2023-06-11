import '@/styles/globals.css';
import "firebase/compat/auth";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import SessionsProvider from "@/context/SessionProvider"


export default function App({ Component, pageProps: { ...pageProps }}) {
  return (
      <>
          <SessionsProvider>
              <ToastContainer />
              {
                  <Component
                      {...pageProps}
                  />
              }
          </SessionsProvider>
      </>
  );
}
