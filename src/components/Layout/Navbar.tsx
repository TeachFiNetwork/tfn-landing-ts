import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useGetAccountInfo, useGetIsLoggedIn } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { WalletMinimal } from "lucide-react";

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();
  const navigate = useNavigate();

  const disconnectWallet = () => {
    logout("/").then(() => window.location.reload());
  };
  const navItems = [
    { label: "Home", href: "/home" },
    { label: "Vision", href: "#vision" },
    { label: "Statistics", href: "#impact" },
    { label: "Partners", href: "#partners" },
    { label: "Team", href: "#team" },
    { label: "About", href: "#about" },
    { label: "Applications", href: "#applications" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <a href="/home" className="flex items-center">
            <img src={logo} alt="TeachFi" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium transition-colors hover:text-teal-600 text-slate-600">
                {item.label}
              </a>
            ))}
          </div>

          {isLoggedIn ? (
            <div className="flex gap-2">
              <div className="sm:flex hidden items-center gap-1">
                <WalletMinimal className="w-4 h-4" />
                <p>
                  {address && address.slice(0, 5)}...
                  {address.slice(address.length - 5, address.length)}
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  size="sm"
                  onClick={() => disconnectWallet()}
                  className="!w-full !border-0 !m-0 bg-[#00394F] hover:bg-[#00394F]/90 text-white font-semibold py-2">
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button
                size="sm"
                onClick={() => navigate("/unlock")}
                className="!w-full !border-0 !m-0 bg-[#00394F] hover:bg-[#00394F]/90 text-white font-semibold py-2">
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
