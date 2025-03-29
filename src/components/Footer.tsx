import { Link } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useGetUserInfoQuery } from "@/lib/services/api";
import { useEffect, useState } from "react";
import { IconMap } from "./ui/IconMap";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { data: user, error, isLoading } = useGetUserInfoQuery({});
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (user && user.length > 0) {
      setUserData({
        text_blocks: user[0]?.userInfo?.text_blocks,
        social_blocks: user[0]?.social_blocks,
        image_blocks: user[0]?.uerInfo?.image_blocks,
      });
    }
  }, [user]);
  return (
    <footer className="bg-card px-6 py-12 sm:py-16 mt-16">
      <div className="section pb-0">
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-12 border-b border-border">
          <div className="max-w-sm">
            <div className="text-2xl font-bold mb-4 flex items-center gap-2">
              <img
                alt={userData?.text_blocks?.nickname}
                src={"/nean_logo.svg"}
                className="size-12"
              />
              <span>{userData?.text_blocks?.nickname}</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Creating beautiful, functional, and accessible digital experiences
              with modern web technologies.
            </p>
            <div className="flex space-x-4">
              {userData?.social_blocks?.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/70 transition-colors"
                >
                  {IconMap[social.name]}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#hero"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Admin</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/analytics"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/projects"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
