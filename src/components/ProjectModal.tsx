import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Project {
  title: string;
  description: string;
  scope: string;
  image: string;
}

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, open, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{project.title}</DialogTitle>
        </DialogHeader>
        <img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[4/3] object-cover"
        />
        <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
        <p className="text-xs text-muted-foreground mt-1">{project.scope}</p>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
