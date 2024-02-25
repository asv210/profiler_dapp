import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { contractAddress, abi } from "../utils/Constant";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const { data: hash, error, writeContract, isPending } = useWriteContract();
  const [register, setRegister] = useState({
    userName: "",
    name: "",
    bio: "",
    age: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      register.userName === "" ||
      register.name === "" ||
      register.bio === "" ||
      register.password === "" ||
      register.abi === 0
    ) {
      alert("Fill in the fields");
      return;
    }
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "signUp",
      args: [
        register.userName,
        register.name,
        register.password,
        register.bio,
        register.age,
      ],
    });
    console.log(hash);
    setRegister({ userName: "", password: "", bio: "", name: "", age: 0 });
    alert("user will be added in some time");
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">UserName</label>
        <input
          type="text"
          placeholder="Enter your userName"
          id="userName"
          onChange={(e) => {
            setRegister({ ...register, userName: e.target.value });
          }}
          value={register.userName}
        />
        <br />
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          id="Name"
          onChange={(e) => {
            setRegister({ ...register, name: e.target.value });
          }}
          value={register.name}
        />
        <br />
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          placeholder="Enter your bio"
          id="bio"
          onChange={(e) => {
            setRegister({ ...register, bio: e.target.value });
          }}
          value={register.bio}
        />
        <br />
        <label htmlFor="age">age</label>
        <input
          type="number"
          placeholder="Enter your age"
          id="age"
          onChange={(e) => {
            setRegister({ ...register, age: e.target.value });
          }}
          value={register.age}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={register.password}
          onChange={(e) => {
            setRegister({ ...register, password: e.target.value });
          }}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {isPending && <h1>Confirmed</h1>}
    </div>
  );
};

export default SignUp;
