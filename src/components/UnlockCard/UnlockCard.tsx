import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import {
  ExtensionLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from "@multiversx/sdk-dapp/UI";
import { useGetNetworkConfig } from "@multiversx/sdk-dapp/hooks";
import { NativeAuthConfigType } from "@multiversx/sdk-dapp/types";
import { getApi } from "@/utils/api.ts";

export default function UnlockCard() {
  const {
    network: { chainId: chainID },
  } = useGetNetworkConfig();

  const nativeAuthProps: NativeAuthConfigType = {
    apiAddress: `https://${getApi(chainID)}`,
    expirySeconds: 3600,
  };

  const commonProps = {
    nativeAuth: {
      ...nativeAuthProps,
    },
    callbackRoute: "/",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <Card className="w-[300px] bg-slate-200/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#00394F]">
            Choose Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 gap-4">
          <ExtensionLoginButton
            className="!w-full !border-0 !m-0 bg-[#00394F] hover:bg-[#00394F]/90 text-white font-semibold py-6"
            loginButtonText={"Extension"}
            {...commonProps}
          />
          <WalletConnectLoginButton
            className="!w-full !border-0 !m-0 bg-[#00394F] hover:bg-[#00394F]/90 text-white font-semibold py-6"
            loginButtonText={"xPortal"}
            {...commonProps}
          />
          <WebWalletLoginButton
            className="!w-full !border-0 !m-0 bg-[#00394F] hover:bg-[#00394F]/90 text-white font-semibold py-6"
            loginButtonText={"Web wallet"}
            {...commonProps}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
