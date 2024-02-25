import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  return (
    <div style={{ position: "fixed", top: 0 }}>
      <button onClick={() => Navigate("/sendTransaction")}>
        Send Transaction
      </button>
      <button onClick={() => Navigate("/")}>Login</button>
    </div>
  );
};

export default Navbar;
