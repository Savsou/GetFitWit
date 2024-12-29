import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {/* {!isLoaded && (
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )} */}
        {isLoaded && <Outlet />}
        <Modal />
        <Footer />
      </ModalProvider>
    </>
  );
}
