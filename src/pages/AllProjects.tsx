import { useState, useRef, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowUpRight, ExternalLink, Github, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProjectCardAlt, ProjectProps } from "@/components/Projects";

// This would come from your CMS or database - expanded from the Projects component data
const allProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React, Node.js, and MongoDB.",
    stack: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    githubURL: "https://github.com",
    previewURL: "https://example.com",

    type: "Fullstack",
  },
  {
    id: 2,
    name: "Project Management Tool",
    description:
      "A collaborative project management tool with real-time updates.",
    stack: ["React", "Firebase", "Tailwind CSS", "GraphQL"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    githubURL: "https://github.com",
    previewURL: "https://example.com",

    type: "UI/UX",
  },
  {
    id: 3,
    name: "AI Content Generator",
    description:
      "An AI-powered tool for generating marketing content using OpenAI APIs.",
    stack: ["Next.js", "OpenAI", "TypeScript", "Framer Motion"],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "AI & Machine Learning",
  },
  {
    id: 4,
    name: "Fitness Tracking App",
    description:
      "A mobile-first fitness tracking application with progress analytics.",
    stack: ["React Native", "Express", "PostgreSQL", "Chart.js"],
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "Mobile Development",
  },
  {
    id: 5,
    name: "Social Media Dashboard",
    description:
      "A comprehensive dashboard for managing multiple social media accounts.",
    stack: ["Vue.js", "Node.js", "Express", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "Web Development",
  },
  {
    id: 6,
    name: "Weather Forecast App",
    description:
      "Real-time weather forecasting application with beautiful visualizations.",
    stack: ["React", "OpenWeather API", "D3.js", "Styled Components"],
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "Web Development",
  },
  {
    id: 7,
    name: "Restaurant Booking System",
    description:
      "A comprehensive booking system for restaurants with table management.",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "Web Development",
  },
  {
    id: 8,
    name: "Blockchain Explorer",
    description:
      "A tool for exploring and analyzing blockchain transactions and smart contracts.",
    stack: ["React", "Web3.js", "Ethereum", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55",
    githubURL: "https://github.com",
    previewURL: "https://example.com",
    type: "Blockchain",
  },
];

// const ProjectCard = ({
//   project,
//   isVisible
// }: {
//   project: ProjectProps,
//   isVisible: boolean
// }) => {
//   return (
//     <div
//       className={cn(
//         "group relative overflow-hidden rounded-xl transition-all duration-700 ease-out hover:shadow-lg",
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       )}
//     >
//       <div className="relative aspect-video overflow-hidden rounded-xl">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//         <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
//           <div>
//             <div className="space-x-2 mb-2">
//               {project.stack.slice(0, 3).map((tag) => (
//                 <span key={tag} className="chip">{tag}</span>
//               ))}
//             </div>
//             <h3 className="text-xl font-semibold">{project.title}</h3>
//           </div>
//           <div className="flex space-x-2">
//             <a
//               href={project.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
//               aria-label={`View ${project.title} on GitHub`}
//             >
//               <Github className="h-5 w-5" />
//             </a>
//             <a
//               href={project.demo}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 rounded-full bg-background/90 text-foreground hover:bg-background transition-colors"
//               aria-label={`View ${project.title} live demo`}
//             >
//               <ExternalLink className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//         <p className="text-muted-foreground mb-4">{project.description}</p>
//         <Button variant="outline" size="sm" className="group" asChild>
//           <a href={project.demo} target="_blank" rel="noopener noreferrer">
//             View Project
//             <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
//           </a>
//         </Button>
//       </div>
//     </div>
//   );
// };

const AllProjects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(allProjects.map((p) => p.type))),
  ];

  // Filter projects based on search and type
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.stack.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchestype = activeFilter === "All" || project.type === activeFilter;

    return matchesSearch && matchestype;
  });

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
  }, [visibleProjects, filteredProjects]);

  // Reset visible projects when filter changes
  useEffect(() => {
    setVisibleProjects([]);

    // Small delay to allow DOM to update
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const projectIndex = Number(
                entry.target.getAttribute("data-index")
              );
              setVisibleProjects((prev) => [...prev, projectIndex]);
            }
          });
        },
        { threshold: 0.1 }
      );

      projectRefs.current.forEach((ref, index) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }, 100);
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="pt-24 pb-16">
        <section className="section">
          <div className="glow left-1/4 top-1/3"></div>

          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="chip mb-3">Portfolio</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              All Projects
            </h1>
            <p className="text-muted-foreground">
              Browse through my complete collection of work and discover the
              diverse range of projects I've created.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-1/2">
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
                {categories.map((type) => (
                  <Button
                    key={type}
                    variant={activeFilter === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(type)}
                    className="transition-all"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="columns-1 md:columns-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria. Try adjusting your
                search.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
