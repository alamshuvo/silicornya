import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/auth/auth.Api";
import { setUser } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ username, password }).unwrap();
    console.log(res);
      const user = res?.user;
      const token = res?.token;
     console.log(token);
      if ( token) {
        dispatch(setUser({ user, token }));
        toast.success("Logged in successfully!", { id: toastId });
        navigate(`/`);
      } else {
        toast.error("Invalid response from server", { id: toastId });
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-500 hover:underline self-start"
      >
        &larr; Go Back
      </button>

      <div className="w-full max-w-md bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <div className="flex mb-5 gap-5">
          <p>parvez</p>
          <p>P@rvez123</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="relative">
            <label className="block mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full border px-3 py-2 rounded pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
