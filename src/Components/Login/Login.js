import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../UserContext/UserContext";



const Login = () => {
  const { login, logInWithGoogle, logInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire("Log In Successful", "", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire("Opps", error.message, "error");
      });
  };

  const handleGoogleLogIn = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire("Log In Successful", "", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Opps", error.message, "error");
      });
  };

  const handleGitSign = () => {
    logInWithGithub()
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire("User Login successful", "", "success");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Opps", error.message, "error");
      });
  };
  return (
    <div className="flex justify-center items-center pt-8">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log in</h1>
          <p className="text-sm text-gray-500">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-gray-900 bg-gray-300 text-gray-900"
                data-temp-mail-org="0"
                required
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-300 focus:border-gray-900 text-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <button
              className="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 text-gray-100"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="space-y-1"></div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center pt-4 space-x-1">
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider">OR</div>
            </div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
        <div></div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleLogIn}
            aria-label="Log in with Google"
            title="Google Sign In"
            className="p-3 rounded-sm text-3xl"
          >
            <FaGoogle />
          </button>

          <button
            onClick={handleGitSign}
            aria-label="Log in with GitHub"
            title="GitHub Sign In"
            className="p-3 rounded-sm text-3xl"
          >
            <FaGithub />
          </button>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don't have an account yet?{" "}
          <Link to="/signup" className="hover:underline text-gray-600">
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
