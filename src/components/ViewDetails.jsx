import React, { useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant.jsx";
import { useNavigate, useParams } from "react-router-dom";
const ViewDetails = () => {
  const userName = useParams().user;
  console.log(userName);
  const navigate = useNavigate();
  const { error, writeContract, isPending } = useWriteContract();

  const { data, isFetching } = useReadContract({
    functionName: "getUser",
    abi: abi,
    address: contractAddress,
    args: [userName],
  });

  const handleDelete = () => {
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "deleteUser",
      args: [userName],
    });
    alert("deleted successful");
    navigate("/");
  };
  useEffect(() => {
    console.log(data);
    data;
  }, [data]);
  return (
    <>
      {data ? (
        <div>
          <p>User Name : {data?.userName}</p>
          <p>Name : {data?.name}</p>
          <p>bio : {data?.bio}</p>
          <p>age : {data?.age} years old</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(`/update/${userName}`)}>
            Update
          </button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default ViewDetails;
