import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Navigate } from "react-router-dom";
import { checkLogin, logoutUserAPI } from "../../config/redux/action/action";

const Dashboard = ({ logout, isLogin, user, checkLogin }) => {
  const [isLogout, setisLogout] = useState(false);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("userData"));
    checkLogin(userLocal);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setisLogout(true);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLogout) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
            QuizMaster
          </h1>
          <div className="flex items-center space-x-4">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
              >
                Keluar
              </button>
            ) : (
              <div className="flex space-x-3">
                <NavLink
                  to="/login"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  Masuk
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  Daftar
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {isLogin ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Selamat Datang Kembali!
            </h2>
            <p className="mt-2 text-lg text-gray-600">{user.email}</p>
            <Link
              to="/quiz"
              className="mt-6 inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Mulai Kuis Sekarang
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Bergabung dengan Petualangan Kuis!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Masuk atau buat akun untuk mulai menguji pengetahuan Anda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const reduxState = (state) => ({
  user: state.user,
  isLogin: state.isLogin,
});

const reduxDispatch = (dispatch) => ({
  logout: () => dispatch(logoutUserAPI()),
  checkLogin: (user) => dispatch(checkLogin(user)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
