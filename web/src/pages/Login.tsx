import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signIn } from "../store/index";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { refetchAuth } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const signMutation = useMutation({
    mutationFn: () =>
      signIn({ email: inputs.email, password: inputs.password }),
    onSuccess: () => {
      refetchAuth();
      alert("Login Successfully");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signMutation.mutate();
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
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
