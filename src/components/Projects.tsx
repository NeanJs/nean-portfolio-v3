import { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  LucidePersonStanding,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "@/lib/services/api";
import { IconMap } from "./ui/IconMap";

// const projects = [
//   {
//     id: 1,
//     title: 'E-Commerce Platform',
//     description: 'A modern e-commerce platform built with React, Node.js, and MongoDB.',
//     tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//     image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
//     github: 'https://github.com',
//     demo: 'https://example.com'
//   },
//   {
//     id: 2,
//     title: 'Project Management Tool',
//     description: 'A collaborative project management tool with real-time updates.',
//     tags: ['React', 'Firebase', 'Tailwind CSS', 'GraphQL'],
//     image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
//     github: 'https://github.com',
//     demo: 'https://example.com'
//   },
//   {
//     id: 3,
//     title: 'AI Content Generator',
//     description: 'An AI-powered tool for generating marketing content using OpenAI APIs.',
//     tags: ['Next.js', 'OpenAI', 'TypeScript', 'Framer Motion'],
//     image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
//     github: 'https://github.com',
//     demo: 'https://example.com'
//   },
//   {
//     id: 4,
//     title: 'Fitness Tracking App',
//     description: 'A mobile-first fitness tracking application with progress analytics.',
//     tags: ['React Native', 'Express', 'PostgreSQL', 'Chart.js'],
//     image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
//     github: 'https://github.com',
//     demo: 'https://example.com'
//   }
// ];

export interface ProjectProps {
  name: string;
  description: string;
  stack: string[];
  imageUrl: string;
  previewUrl: string;
  githubUrl: string;
  type: string;
  status?: "Active" | "Pending" | "Beta";
  role?: string;
  year?: string;
}
const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: projects, error, isLoading } = useGetProjectsQuery({});
  // const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    if (!projects) return;

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
  }, [projects, visibleProjects]);

  if (isLoading) {
    return <div>Fetching the latest projects...</div>;
  }

  if (error) {
    return <div>Error loading projects</div>;
  }

  return (
    <section id="projects" className="section">
      <div className="glow left-1/4 top-1/3"></div>

      <div className="text-center mb-16 max-w-2xl mx-auto">
        <div className="chip mb-3">Portfolio</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Featured Projects
        </h2>
        <p className="text-muted-foreground">
          A collection of my recent work showcasing my skills and experience in
          web development and design.
        </p>
      </div>

      <div className="columns-1 md:columns-3 gap-4 relative">
        {projects?.length > 0 &&
          projects.map((project, index) => (
            <div
              key={project?._id}
              ref={(el) => (projectRefs.current[index] = el)}
              data-index={index}
            >
              <ProjectCardAlt
                project={project}
                isVisible={visibleProjects.includes(index)}
              />
            </div>
          ))}
      </div>

      <div className="mt-16 text-center">
        <Button size="lg" asChild>
          <Link to="/projects">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Projects;

export const ProjectCardAlt = ({
  project: { data },
  isVisible,
}: {
  project: { data: ProjectProps };
  isVisible?: boolean;
}) => {
  return (
    <div
      data-aos="zoom-in"
      key={data?.name}
      className="mb-4 group relative overflow-hidden rounded-lg max-h-[500px]"
      // onClick={() => handleModal(item)}
    >
      <img
        src={data?.imageUrl}
        className="group-hover:scale-125 ease-linear duration-200"
        alt={data?.name}
      />
      <div className="absolute  inset-0 bg-black bg-opacity-50 flex flex-col p-4  items-start justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
        {/* <IoOpenOutline className="text-white text-3xl" /> */}
        <span className="text-white text-lg">{data?.name}</span>
        <span className="type text-black bg-white size-fit px-2 py-1 rounded-md">
          {data?.type}
        </span>
        <div className="prj-tags my-2 flex gap-1 text-xs">
          {data?.stack?.map((tag, key) => (
            <span
              key={key}
              className="bg-primary-foreground text-black rounded px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
          <div className="flex space-x-3">
            {data?.githubUrl && (
              <a
                href={data?.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary/50 bg-secondary text-foreground transition-colors"
                aria-label={`View ${data?.name} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {data?.previewUrl && (
              <a
                href={data?.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/50 text-foreground transition-colors"
                aria-label={`Visit ${data?.name} website`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

            {data?.previewUrl && (
              <Button variant="secondary" size="sm" className="group" asChild>
                <a
                  href={data?.previewUrl}
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
      </div>
    </div>
  );
};
