import { NavLink } from "react-router-dom";
import { useGetAccountInfo, useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { Button } from "@/components/ui/button.tsx";
import { logout } from "@multiversx/sdk-dapp/utils";
import React from "react";
import { WalletMinimal } from "lucide-react";

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();
  console.log(address);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to={"/"}>
          <div className="text-white text-2xl font-[anton]">DustConverter</div>
        </NavLink>
        {isLoggedIn && (
          <>
            <div className="flex items-center gap-1">
              <WalletMinimal className="w-4 h-4" />
              <p>
                {address.slice(0, 5)}...{address.slice(address.length - 5, address.length)}
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                size="sm"
                onClick={() => logout("/")}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-xs text-white font-semibold py-2">
                Disconnect
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
