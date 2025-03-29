import { useState } from "react";
// Removed unused imports
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebase.config"; // Ensure a proper TypeScript declaration file exists for this module
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetProjectsQuery, useGetStartupsQuery } from "@/lib/services/api";
import { ProjectProps } from "./Projects";
import { Textarea } from "./ui/textarea";

const AdminProjects = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stack: "",
    imageUrl: null,
    githubUrl: "",
    previewUrl: "",
    role: "",
    year: "",
    type: "",
    status: "",
  });
  const [isStartup, setIsStartup] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isProject, setIsProject] = useState(true);
  const projectsQuery = useGetProjectsQuery({});
  const startupsQuery = useGetStartupsQuery({});
  const projects = isProject ? projectsQuery.data : startupsQuery.data;
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (project: { _id: string; data: ProjectProps }) => {
    setEditingProjectId(project._id);
    setFormData({
      name: project?.data?.name,
      description: project?.data?.description,
      stack: project?.data?.stack?.join(", "),
      imageUrl: project?.data?.imageUrl,
      githubUrl: project?.data?.githubUrl,
      previewUrl: project?.data?.previewUrl,
      type: project?.data?.type,
      status: project?.data?.status,
      role: project?.data?.role,
      year: project?.data?.year,
    });
    setIsStartup(!!project?.data?.status);
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const collectionName = isStartup ? "startups" : "projects";
      const dataToUpload = {
        name: formData.name,
        description: formData.description,
        stack: formData.stack.split(","),
        imageUrl: formData.imageUrl,
        githubUrl: formData.githubUrl,
        previewUrl: formData.previewUrl,
        type: formData.type,
        status: formData.status,
        role: formData.role,
        year: formData.year,
      };
      console.log(dataToUpload);
      if (editingProjectId) {
        // Update existing project
        const docRef = doc(db, collectionName, editingProjectId);
        await updateDoc(docRef, dataToUpload);

        toast({ title: "Project updated successfully!" });
      } else {
        // Add new project
        await addDoc(collection(db, collectionName), dataToUpload);
        toast({ title: "Project/Startup added successfully!" });
      }

      // Reset form
      handleResetFormData();
      setEditingProjectId(null);
      setIsStartup(false);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleResetFormData = () => {
    setFormData({
      name: "",
      description: "",
      stack: "",
      imageUrl: null,
      githubUrl: "",
      previewUrl: "",
      type: "",
      status: "",
      role: "",
      year: "",
    });
  };
  const handleDelete = async (projectId: string) => {
    try {
      const collectionName = isStartup ? "startups" : "projects";
      const docRef = doc(db, collectionName, projectId);
      await deleteDoc(docRef);

      toast({ title: "Project deleted successfully!" });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({ title: "Failed to delete project." });
    }
  };
  return (
    <div className="min-h-screen">
      <Button
        className="capitalize"
        onClick={() => {
          setIsProject(!isProject);
          setEditingProjectId(null);
          handleResetFormData();
        }}
      >
        Toggle Fetch
      </Button>
      <h1 className="text-2xl font-bold my-4 capitalize">
        Your Existing {isProject ? "Projects" : "Startups"}
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {projects?.map((project: { _id: string; data: ProjectProps }) => (
          <div
            key={project?._id}
            className="border rounded-lg p-4 shadow-md flex flex-col justify-between"
          >
            <div>
              <img src={project?.data?.imageUrl} />
              <h2 className="text-lg font-bold">{project?.data?.name}</h2>
              <p className="text-sm text-gray-600">
                {project?.data?.description}
              </p>
              <p className="text-sm mt-2"></p>
              <strong>Stack:</strong> {project?.data?.stack?.join(", ")}
              <div className="mt-2">
                <a
                  href={project?.data?.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  GitHub
                </a>
                {" | "}
                <a
                  href={project?.data?.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Preview
                </a>{" "}
                {" | "}
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleEdit(project)}>
              Edit
            </Button>
            <Button
              className="mt-4"
              variant="destructive"
              onClick={() => handleDelete(project._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {editingProjectId ? "Update" : "Add"}{" "}
        {isProject ? "Project" : "Startup"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {!isProject && (
          <Input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        )}
        {!isProject && (
          <Input
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        )}
        <Input
          name="stack"
          placeholder="Stack (comma separated)"
          value={formData.stack}
          onChange={handleChange}
          required
        />
        <Input
          name="githubUrl"
          placeholder="GitHub Url"
          value={formData.githubUrl}
          onChange={handleChange}
          required
        />
        <Input
          name="previewUrl"
          placeholder="Preview Url"
          value={formData.previewUrl}
          onChange={handleChange}
          required
        />
        <Input
          name="imageUrl"
          placeholder="Image Url"
          value={formData.imageUrl || ""}
          onChange={handleChange}
        />
        <Select
          value={formData.type}
          required
          onValueChange={(e) => {
            setFormData({
              ...formData,
              type: e,
            });
          }}
        >
          <SelectTrigger>
            {formData.type ? formData.type : "Choose your Project Type"}
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Fullstack">Fullstack</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isStartup}
            onChange={() => setIsStartup(!isStartup)}
          />
          <label className="ml-2">Is this a Startup?</label>
        </div>
        {isStartup && (
          <Select
            value={formData.status}
            required
            onValueChange={(e) => {
              setFormData({
                ...formData,
                status: e,
              });
            }}
          >
            <SelectTrigger>
              {formData.status ? formData.status : "Choose your Startup Status"}
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Beta">Beta</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Button type="submit">
          {editingProjectId ? "Update Project" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AdminProjects;
