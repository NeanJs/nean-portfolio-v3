import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Star,
  Sparkles,
  Code,
  MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useGetProjectsQuery, useGetUserInfoQuery } from "@/lib/services/api";
import { IconMap } from "./ui/IconMap";
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userData, setUserData] = useState(null);
  const { data: user, error, isLoading } = useGetUserInfoQuery({});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !floatingRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      setMousePosition({ x, y });

      const moveX = (x - width / 2) / 25;
      const moveY = (y - height / 2) / 25;

      floatingRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  useEffect(() => {
    if (user && user.length > 0) {
      setUserData({
        achievement_blocks: user[0]?.userInfo?.achievement_blocks,
        text_blocks: user[0]?.userInfo?.text_blocks,
        social_blocks: user[0]?.social_blocks,
      });
    }
  }, [user]);

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center relative overflow-hidden pt-16"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Mouse follower gradient */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(125,122,255,0.8) 0%, rgba(125,122,255,0) 70%)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      ></div>

      <div className="section relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="max-w-3xl">
            <div className="relative mb-8">
              <div className="absolute -top-12 -left-12 text-5xl text-primary/10 hidden md:block">
                &lt;/&gt;
              </div>
              <div className="flex flex-col gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="chip animate-fade-in inline-flex items-center gap-1"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Code className="h-3 w-3" />
                      <span>{userData?.text_blocks.title}</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter animate-fade-in"
                    style={{ animationDelay: "0.4s" }}
                  >
                    {userData?.text_blocks.head}
                  </h1>
                  <span className="absolute -top-6 right-0 text-xs text-primary/70">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  </span>
                </div>

                <p
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  {userData?.text_blocks.body}
                </p>

                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 animate-fade-in"
                  style={{ animationDelay: "0.8s" }}
                >
                  <Button size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      View Projects
                      <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>

                  <div className="flex items-center gap-2">
                    {userData?.social_blocks?.length > 0 &&
                      userData?.social_blocks?.map((social, index) => {
                        return (
                          <a
                            key={index}
                            href={social.href}
                            className="inline-block mr-4"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {IconMap[social.name]}
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-start mt-12 gap-8">
              {userData?.achievement_blocks?.map((achievement, idx) => (
                <div className="flex items-center gap-8" key={idx}>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.title}
                    </div>
                  </div>
                  {idx < 2 && <div className="h-12 w-px bg-border"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg h-96 lg:h-96 xl:h-96">
            <div className="relative z-10 rounded-2xl overflow-hidden w-full h-full">
              <img src="animate.svg" className="h-full" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-float">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl rounded-full transform scale-75 translate-x-8 translate-y-8"></div>
          </div>
        </div>
      </div>

      <div
        ref={floatingRef}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full opacity-70 transition-transform duration-200 ease-out hidden md:block"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%)",
        }}
      >
        <div
          className="absolute w-full h-full animate-float"
          style={{ animationDelay: "0s" }}
        >
          <div className="absolute top-1/4 left-1/4 blur-dot"></div>
        </div>
        <div
          className="absolute w-full h-full animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="absolute top-3/4 left-1/2 blur-dot"></div>
        </div>
        <div
          className="absolute w-full h-full animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="absolute top-1/2 right-1/4 blur-dot"></div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#projects" aria-label="Scroll to projects">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
