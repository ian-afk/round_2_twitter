import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUp } from "../store/index";
import { useAuth } from "../hooks/useAuth";

function Signup() {
  const { refetchAuth } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });

  const signUpMutation = useMutation({
    mutationFn: () =>
      signUp({
        email: inputs.email,
        password: inputs.password,
        fullName: inputs.fullName,
        username: inputs.username,
      }),
    onSuccess: () => {
      refetchAuth();
      alert("Sign up successfully");
    },
    onError: (error: Error) => alert("An error occurred: " + error.message),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUpMutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="border-b-2 flex justify-end items-center p-2">
      <form action="" className="flex space-x-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="mr-1">
            email
          </label>
          <input
            type="text"
            className="border p-1 rounded"
            onChange={handleChange}
            name="email"
            value={inputs.email}
          />
        </div>
        <div>
          <label htmlFor="" className="mr-1">
            Fullname
          </label>
          <input
            type="text"
            className="border p-1 rounded"
            onChange={handleChange}
            name="fullName"
            value={inputs.fullName}
          />
        </div>
        <div>
          <label htmlFor="" className="mr-1">
            Username
          </label>
          <input
            type="username"
            className="border p-1 rounded"
            onChange={handleChange}
            name="username"
            value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="" className="mr-1">
            password
          </label>
          <input
            type="password"
            className="border p-1 rounded"
            onChange={handleChange}
            name="password"
            value={inputs.password}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
