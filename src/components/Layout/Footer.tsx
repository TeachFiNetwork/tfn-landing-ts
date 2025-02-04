import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#1C2024] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Logo */}
          <img src={logo} alt="TeachFi" className="h-8" />

          {/* Navigation */}
          <nav>
            <ul className="flex gap-8 text-sm">
              <li>
                <a href="#home" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-gray-300">
                  Vision
                </a>
              </li>
              <li>
                <a href="#statistics" className="hover:text-gray-300">
                  Statistics
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-gray-300">
                  Partners
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-gray-300">
                  Team
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#applications" className="hover:text-gray-300">
                  Applications
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="flex gap-2 w-full max-w-sm">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-gray-700"
            />
            <Button className="bg-[#00394F] hover:bg-[#00394F]/90">Subscribe</Button>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">© 2024 TeachFi. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
