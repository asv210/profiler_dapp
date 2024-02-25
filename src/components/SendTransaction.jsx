import * as React from "react";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import Navbar from "./Navbar";
export function SendTransaction() {
  const { data: hash, isPending, sendTransaction } = useSendTransaction();
    
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get("address");
    const value = formData.get("value");
    formData.set("value", "");
    formData.set("address", "");
    sendTransaction({ to, value: parseEther(value) });
  }

  return (<>
    <Navbar/>    <form onSubmit={submit}>
      <input name="address" placeholder="enter address" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  </>
  );
}
