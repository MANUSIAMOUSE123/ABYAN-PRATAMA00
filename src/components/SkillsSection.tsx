import { motion } from 'framer-motion';

const skills = {
  design: [
    { name: 'UI/UX Design', level: 92 },
    { name: 'Digital Illustration', level: 95 },
    { name: 'Graphic Design', level: 90 },
    { name: 'Typography', level: 85 },
    { name: 'Branding & Identity', level: 88 },
  ],
  content: [
    { name: 'Video Editing', level: 85 },
    { name: 'Motion Graphics', level: 80 },
    { name: 'Storyboarding', level: 88 },
    { name: 'Copywriting', level: 75 },
    { name: 'Social Media Strategy', level: 82 },
  ],
  tools: [
    { name: 'Adobe Photoshop', level: 95 },
    { name: 'Figma', level: 92 },
    { name: 'Adobe Premiere Pro', level: 85 },
    { name: 'Procreate', level: 98 },
    { name: 'After Effects', level: 78 },
  ],
};

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Keahlian</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Creative & Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Loop untuk setiap kategori Skill agar kode lebih bersih */}
          {Object.entries(skills).map(([category, items], categoryIdx) => {
            // Mapping icon manual berdasarkan kategori
            const icons = { design: '🎨', content: '🎬', tools: '🛠️' };
            const titles = { design: 'Design', content: 'Content', tools: 'Software' };

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
                
                // ANIMASI MELAYANG (Floating effect pada Card)
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4 + categoryIdx, // Durasi sedikit berbeda tiap card agar tidak kaku
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                
                className="p-6 glass rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <span className="text-2xl">
                      {icons[category as keyof typeof icons]}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    {titles[category as keyof typeof titles]}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {items.map((skill, index) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
                      delay={index * 0.1} 
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}