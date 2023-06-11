import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";

const login = async () => {
    let isLogin = false;
    const isEmailAllowed = (email) => {
        const allowedEmails = [
            "a127dsx1695@bangkit.academy",
            "m361dsx2922@bangkit.academy",
            "m284dsx1749@bangkit.academy",
            "c072dsx3093@bangkit.academy",
            "m151dsx1328@bangkit.academy",
            "c350dsx2960@bangkit.academy"
        ];

        return allowedEmails.includes(email.toString());
    };

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
        .then(async (result) => {
            if (result.user) {
                if (isEmailAllowed(result.user.email)) {
                    isLogin = true
                } else {
                    await signOut(auth)
                }
            }
        })
    return isLogin
}

export default login;
