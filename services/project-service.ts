import Api from './Api.ts';
import {Project} from '../models/project.model.ts';

export const fetchProjects = async (filter: string): Promise<Project[]> => {
  const result = await Api.get<Project[]>(`/projects?query=${filter}`);
  return result.data;
};

export const fetchProject = async (id: string): Promise<Project> => {
  const [result] = await Promise.all([Api.get<Project>(`/projects/${id}`)]);
  return result.data;
};

export const updateProject = async (project: Project): Promise<Project> => {
  console.log(JSON.stringify(project));
  const result = await Api.put<Project>(`/projects/${project.id}`, project);
  return result.data;
};
