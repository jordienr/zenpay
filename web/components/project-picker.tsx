"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";

type Project = {
  id: string;
  name: string;
};
type Props = {
  currentProject: Project;
  projects: Project[];
};
export function ProjectPicker({ currentProject, projects }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="w-[180px]">
      <Select
        onValueChange={(e: string) => {
          // push to the new project, maintaining the current path
          const newPath = pathname.replace(
            /\/projects\/[^/]+/,
            `/projects/${e}`
          );
          router.push(newPath);
        }}
        defaultValue={currentProject.id}
      >
        <SelectTrigger className="border-none font-medium [&_svg]:opacity-0 [&_svg]:hover:opacity-60">
          {currentProject.name}
        </SelectTrigger>
        <SelectContent default>
          {projects.map((project) => (
            <SelectItem value={project.id} key={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
