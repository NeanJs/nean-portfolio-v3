import { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Calendar,
  Briefcase,
  ExternalLink,
  Github,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetStartupsQuery } from "@/lib/services/api";
import { ProjectProps } from "./Projects";

// Types for startup projects
interface StartupProject {
  name: string;
  description: string;
  tags: string[];
  imageUrl: string;
  previewUrl: string;
  githubUrl: string;
  stacks: string[];
  type: string;
  year: string;
  role: string;
  status: "Active" | "Acquired" | "Completed";
}

// Sample startup projects data

// Status badge component
const StatusBadge = ({ status }: { status: ProjectProps["status"] }) => {
  const colors = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Beta:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colors[status]
      )}
    >
      {status}
    </span>
  );
};

const StartupCard = ({
  project,
  isVisible,
}: {
  project: { data: ProjectProps };
  isVisible: boolean;
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-700 group hover:shadow-lg border-none bg-background/50 backdrop-blur-sm relative",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={project?.data?.imageUrl}
          alt={project?.data?.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent">
          <div className="absolute top-4 left-4">
            <StatusBadge status={project?.data?.status} />
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project?.data?.name}
          </h3>

          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground/70" />
              <span>{project?.data?.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground/70" />
              <span>{project?.data?.year}</span>
            </div>
          </div>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {project?.data?.description?.length > 100
              ? `${project?.data?.description.substring(0, 100)}...`
              : project?.data?.description}
            </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {project?.data?.stack?.map((tech) => (
              <span
                key={tech}
                className="text-xs py-1 px-2 bg-primary/10 text-primary/80 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
            <div className="flex space-x-3">
              {project?.data?.githubUrl && (
                <a
                  href={project?.data?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                  aria-label={`View ${project?.data?.name} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project?.data?.previewUrl && (
                <a
                  href={project?.data?.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
                  aria-label={`Visit ${project?.data?.name} website`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            {project?.data?.previewUrl && (
              <Button variant="ghost" size="sm" className="group" asChild>
                <a
                  href={project?.data?.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                  <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Startups = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { data: startupProjects, error, isLoading } = useGetStartupsQuery({});
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectIndex = Number(entry.target.getAttribute("data-index"));
          if (!visibleProjects.includes(projectIndex)) {
            setVisibleProjects((prev) => [...prev, projectIndex]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [startupProjects, visibleProjects]);

  return (
    <section
      id="startups"
      className="section relative bg-secondary/5 overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="chip mb-3 inline-flex items-center gap-1">
            <Rocket className="h-3 w-3" />
            <span>Startup Projects</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Entrepreneurial Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ventures I've founded, co-founded, or played a significant role in
            developing from concept to product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {startupProjects?.length > 0 &&
            startupProjects?.map((project, index) => (
              <div
                key={index}
                ref={(el) => (projectRefs.current[index] = el)}
                data-index={index}
              >
                <StartupCard
                  project={project}
                  isVisible={visibleProjects.includes(index)}
                />
              </div>
            ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="inline-flex items-center gap-2"
            variant="outline"
          >
            <span>Explore All Ventures</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Startups;
