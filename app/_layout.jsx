import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth(); // Example hook to check auth status
  const segments = useSegments();
  const router = useRouter();
  // Redirect logic based on authentication status

  useEffect(() => {

    if (typeof isAuthenticated === 'undefined') return;
    // You can return a loading screen here while checking auth status
    const inApp = segments[0] === 'app)';
    if (isAuthenticated && !inApp) {
      // Redirect to the Home page if authenticated
      router.replace('account');
    } else if (isAuthenticated == false) {
      // Redirect to login if not authenticated
      router.replace('signIn');
    }

  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
