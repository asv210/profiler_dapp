import { useEffect, useState } from "react";
import React from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const userName = useParams().user;
  const navigate = useNavigate();
  const {
    data: hash,
    error,
    writeContract,
    isPending,
    isSuccess,
  } = useWriteContract();

  const [register, setRegister] = useState({
    userName: "",
    name: "",
    bio: "",
    age: 0,
    password: "",
  });
  const { data } = useReadContract({
    functionName: "getUser",
    abi: abi,
    address: contractAddress,
    args: [userName],
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
      functionName: "updateUser",
      args: [
        register.userName,
        register.name,
        register.password,
        register.bio,
        register.age,
      ],
    });
    if (!isPending) {
      alert("updated successful");
      navigate(`/view-profile/${register.userName}`);
    }
  };
  useEffect(() => {
    if (data) {
      setRegister({
        ...register,
        userName: data.userName,
        name: data.name,
        bio: data.bio,
        age: parseInt(data.age),
        password: data.password,
      });
    }
  }, [data]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">UserName</label>
        <input
          type="text"
          placeholder="Enter your userName"
          id="userName"
          disabled="true"
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
