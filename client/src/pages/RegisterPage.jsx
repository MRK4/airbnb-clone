import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try{
        await axios.post("/register", {
            name,
            email,
            password
        });
        alert("Registration successful! Now you can login.");
    } catch(e){
        alert("Registration failed. Please try again later.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="-mt-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="my-1 primary">Register</button>
          <div className="text-gray-500 text-center py-2">
            Already a member ?
            <Link
              className="transition underline text-black hover:text-primary"
              to={"/login"}
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
