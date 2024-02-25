import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWriteContract, useReadContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant.jsx";
import { readContract } from "@wagmi/core";
import { config } from "../config/config.jsx";
import { sepolia } from "viem/chains";
// ...
import Navbar from "./Navbar.jsx";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });
  // const { data, error, writeContract, isPending } = useWriteContract();

  const navigate = useNavigate();

  const { isSuccess,isFetched } = useReadContract({
    functionName: "login",
    abi: abi,
    address: contractAddress,
    args: [loginInfo.userName, loginInfo.password],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginInfo.userName === "" || loginInfo.password === "") {
      alert("Fill in the fields");
      return;
    }

    if (isFetched) {
      alert("Login successful");
      navigate(`/view-profile/${loginInfo.userName}`);
    } else {
      alert("Username does not match with password");
    }

    setLoginInfo({ userName: "", password: "" });
  };

  return (
    <>
      <Navbar />
      <div>
        <label htmlFor="userName">UserName</label>
        <input
          type="text"
          placeholder="Enter your userName"
          id="userName"
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, userName: e.target.value });
          }}
          value={loginInfo.userName}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          value={loginInfo.password}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        <br />
        <button onClick={handleSubmit}>Login</button>
        <button onClick={() => navigate("/signup")}>Create New</button>
      </div>
    </>
  );
};

// export default Login;

// const Login = () => {
//   const [loginInfo, setLoginInfo] = useState({
//     userName: "",
//     password: "",
//   });
//   // const { data: hash, writeContract } = useWriteContract();
//   const result = useReadContract({
//     functionName: "login",
//     abi: abi,
//     address: contractAddress,
//     args: ["apar", "apar23"],
//   });
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(loginInfo.userName);
//     console.log(loginInfo.password);

//     console.log(result);
//     console.log(isLoading);
//     setLoginInfo({ ...loginInfo, userName: "", password: "" });
//     // console.log(result.data);
//     // navigate("view-profile");
//   };

//   return (
//     <>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           id="email"
//           onChange={(e) => {
//             setLoginInfo({ ...loginInfo, userName: e.target.value });
//           }}
//           value={loginInfo.userName}
//         />
//         <br />
//         <label htmlFor="password">password</label>
//         <input
//           type="password"
//           placeholder="Enter your password"
//           id="password"
//           value={loginInfo.password}
//           onChange={(e) => {
//             setLoginInfo({ ...loginInfo, password: e.target.value });
//           }}
//         />
//         <br />
//         <button onClick={handleSubmit}>Login</button>
//         {/* {hash && <p>{hash}</p>} */}
//         <button onClick={() => navigate("/signup")}>Create New</button>
//         {result ? <p>{result}</p> : <p>no data</p>}
//       </div>
//     </>
//   );
// };

export default Login;
