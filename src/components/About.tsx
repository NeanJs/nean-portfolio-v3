import { useRef, useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Layout,
  Server,
  Lock,
  Smartphone,
  Settings,
  Terminal,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetUserInfoQuery } from "@/lib/services/api";
import { IconMap } from "./ui/IconMap";

const SkillCard = ({
  icon,
  name,
  description,
  delay,
  isVisible,
  className,
}: {
  icon: string;
  name: string;
  description: string;
  delay: number;
  isVisible: boolean;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-none transition-all duration-500 relative bg-background/50 backdrop-blur-sm",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center transform transition-all duration-300 group-hover:bg-primary/20">
            {IconMap[icon]}
          </div>
          <h3 className="text-lg font-medium">{name}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>

        {/* Subtle accent line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </CardContent>
    </Card>
  );
};

const Achievement = ({ number, title }: { number: string; title: string }) => (
  <div className="text-center">
    <div className="text-3xl font-medium mb-1 text-foreground">{number}</div>
    <p className="text-muted-foreground text-sm">{title}</p>
  </div>
);

// A more minimal section heading
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pb-2 mb-12 inline-block">
    <h3 className="text-2xl font-medium">{children}</h3>
    <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-primary/30"></div>
  </div>
);

const About = () => {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const { data: about, error, isLoading } = useGetUserInfoQuery({});
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (about && about.length > 0) {
      setUserInfo({
        text_blocks: about[0]?.userInfo?.text_blocks,
        description_blocks: about[0]?.userInfo?.description_blocks,
        achievement_blocks: about[0]?.userInfo?.achievement_blocks,
        profile_img: about[0]?.userInfo?.image_blocks?.profile,
        skill_blocks: about[0]?.userInfo?.skill_blocks,
        social_blocks: about[0]?.social_blocks,
      });
    }
  }, [about]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id && !visibleElements.includes(id)) {
            setVisibleElements((prev) => [...prev, id]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (aboutTextRef.current) observer.observe(aboutTextRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (achievementsRef.current) observer.observe(achievementsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [visibleElements, about]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      className="section relative bg-secondary/10 overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle background elements */}
      <div
        className="glow absolute opacity-30"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="chip mb-3">About Me</div>
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            My Background & Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer with expertise in creating modern web
            applications and digital experiences.
          </p>
        </div>

        <div
          id="about-text"
          ref={aboutTextRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700",
            visibleElements.includes("about-text")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div>
            <div className="aspect-square w-full max-w-md mx-auto md:mx-0 relative rounded-xl overflow-hidden border border-border/20">
              <img
                src={userInfo?.profile_img}
                alt="Profile"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div className="flex space-x-4">
                  {userInfo?.social_blocks?.map((social, index) => (
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
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl font-medium">
              Hi, I'm{" "}
              <span className="highlight">{userInfo?.text_blocks?.name}</span>
            </h3>
            <p className="text-muted-foreground">
              {userInfo?.description_blocks[0]}
            </p>
            <p className="text-muted-foreground">
              {userInfo?.description_blocks[1]}
            </p>

            <div
              id="achievements"
              ref={achievementsRef}
              className={cn(
                "grid grid-cols-3 gap-6 py-6 border-y border-border/30 my-6",
                visibleElements.includes("achievements")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              {userInfo?.achievement_blocks?.map((achievement, idx) => (
                <Achievement
                  key={idx}
                  number={achievement.number}
                  title={achievement.title}
                />
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button size="default" variant="default">
                Download Resume
              </Button>
              <Button size="default" variant="outline">
                View Projects
              </Button>
            </div>
          </div>
        </div>

        <div id="skills" ref={skillsRef} className="space-y-12">
          <div className="text-center">
            <SectionHeading>My Skills & Expertise</SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userInfo?.skill_blocks?.map((skill, index) => (
              <SkillCard
                key={index}
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
                delay={index * 100}
                isVisible={visibleElements.includes("skills")}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always looking for new challenges and opportunities to grow as
              a developer. If you have a project in mind or just want to
              connect, feel free to reach out!
            </p>
            <Button size="default" variant="outline">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
