import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db, firebaseAuth } from "../firebaseConfig.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(firebaseAuth, (user) => {
            // console.log('got user: ', user)
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, []);

    const updateUserData = async (uid) => {
        // Placeholder for any user data update logic
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("User data:", docSnap.data());
            let data = docSnap.data();
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
        } else {
            console.log("No such user data!");
        }
    }

    const changeAuxiliary = async (newAuxiliary) => {
        if (!user) return { success: false, msg: "No user logged in" };
        try {
            await updateDoc(doc(db, "users", user.userId), {
                Auxiliary: newAuxiliary,
            });

            // Update local user state
            setUser({ ...user, Auxiliary: newAuxiliary });
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    };

    const forgotPassword = async (email) => {
        try {
            await sendPasswordResetEmail(firebaseAuth, email);
            return { success: true, msg: "Password reset email sent successfully" };
        } catch (e) {
            let msg = e.message;

            if (msg.includes('(auth/invalid-email)')) {
                msg = "Invalid email address";
            }
            if (msg.includes('(auth/user-not-found)')) {
                msg = "No account found with this email";
            }
            if (msg.includes('(auth/network-request-failed)')) {
                msg = "Network error. Please check your internet connection";
            }



            return { success: false, msg };
        }
    };


    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) {
                msg = "Invalid Email";
            }
            if (msg.includes('(auth/invalid-credential)')) {
                msg = "Invalid Credentials";
            }
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(firebaseAuth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    const register = async (email, password, username) => {
        try {
            const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // console.log('response.user', response.user);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username: username,
                userId: response?.user?.uid,
            });

            return { success: true, data: response?.user };

        } catch (e) {
            let msg = e.message;

            if (msg.includes('(auth/invalid-email)')) {
                msg = "Invalid Email";
            }
            if (msg.includes('(auth/email-already-in-use)')) {
                msg = "Email already in use";
            }

            return { success: false, msg };
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, logout, register, forgotPassword, changeAuxiliary }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("use Auth must be used within an AuthContextProvider");
    }
    return value;
};
