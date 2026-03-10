import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Palette, Clapperboard, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Visual Identity: Brand X',
    description: 'Proyek desain identitas visual lengkap mulai dari logo, pemilihan palet warna, hingga panduan tipografi untuk startup teknologi.',
    tags: ['Branding', 'Figma', 'Adobe Illustrator'],
    image: '🎨',
    color: 'from-blue-500/20 to-indigo-500/20',
    demo: '#', // Link ke Behance atau Dribbble
    isContent: false,
  },
  {
    title: 'Digital Illustration Series',
    description: 'Koleksi ilustrasi digital bertema "Cyberpunk Indonesia" yang mengeksplorasi perpaduan budaya lokal dengan elemen futuristik.',
    tags: ['Illustration', 'Procreate', 'Digital Art'],
    image: '🖌️',
    color: 'from-purple-500/20 to-pink-500/20',
    demo: '#',
    isContent: false,
  },
  {
    title: 'Educational Motion Design',
    description: 'Konten video edukasi singkat mengenai tips desain yang dioptimalkan untuk platform Instagram Reels dan TikTok.',
    tags: ['Video Editing', 'After Effects', 'Content Creation'],
    image: '🎬',
    color: 'from-orange-500/20 to-red-500/20',
    youtube: 'https://youtube.com/...',
    isContent: true,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Projects & Karya Kreatif
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                {/* Image Placeholder */}
                <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}>
                  <span className="text-6xl">{project.image}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {project.isContent && (
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full bg-primary/10 text-primary font-bold">
                        Content
                      </span>
                    )}
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 italic">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[11px] rounded-md bg-secondary text-secondary-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    {/* Github disembunyikan jika tidak ada link (biasanya desainer tidak pakai github) */}
                    {project.github && (
                      <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}

                    {project.demo && (
                      <Button size="sm" className="rounded-full" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Work
                        </a>
                      </Button>
                    )}

                    {project.youtube && (
                      <Button size="sm" variant="secondary" className="rounded-full" asChild>
                        <a href={project.youtube} target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4 mr-1 text-red-500 fill-red-500" />
                          Watch Video
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}