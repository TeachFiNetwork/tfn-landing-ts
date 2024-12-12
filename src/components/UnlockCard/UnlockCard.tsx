import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import {
  ExtensionLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from "@multiversx/sdk-dapp/UI";
import { useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UnlockCard() {
  const isLoggedIn = useGetIsLoggedIn();
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Card className="w-[300px] bg-[#0D0B1A] shadow-inner shadow-purple-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Choose Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 gap-4">
          <ExtensionLoginButton
            callbackRoute={"/"}
            className="!w-full !border-0 !m-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6"
            loginButtonText={"Extension"}
          />
          <WalletConnectLoginButton
            callbackRoute={"/"}
            className="!w-full !border-0 !m-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6"
            loginButtonText={"xPortal"}
          />
          <WebWalletLoginButton
            callbackRoute={"/"}
            className="!w-full !border-0 !m-0 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-6"
            loginButtonText={"Web wallet"}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
