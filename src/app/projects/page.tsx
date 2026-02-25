import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">No projects yet. Check back soon.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
