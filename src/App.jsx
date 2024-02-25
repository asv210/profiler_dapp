import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { config } from "./config/config";
import { WagmiProvider } from "wagmi";
import { useAccount } from "wagmi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Account } from "./utils/Account";
import { WalletOptions } from "./utils/Wallet-options";
import { Profile } from "./Profile";
import { SendTransaction } from "./components/SendTransaction";
import ViewDetails from "./components/ViewDetails";
const queryClient = new QueryClient();
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Update from "./components/Update";
import Delete from "./components/Delete";

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
          <Router>
          
            <Routes>
              <Route path="/sendTransaction" element={<SendTransaction />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/update/:user" element={<Update />} />
              <Route path="/delete" element={<Delete />} />
              <Route path="/view-profile/:user" element={<ViewDetails />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
