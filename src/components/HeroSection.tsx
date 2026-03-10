import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      <ThreeScene />
      
      {/* Container utama dengan Flex Row */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* --- KIRI: FOTO (Motion untuk efek masuk) --- */}
        <motion.div 
          className="w-full md:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 p-2 shadow-glow">
            <img 
              src="/path-ke-foto-kamu.jpg" 
              alt="Abyan" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* --- KANAN: KONTEN TEKS --- */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
          >
            👋 Selamat datang
          </motion.span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Perkenalkan
            <br />
            <span className="text-primary">Nama Saya Abyan</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Halo! Selamat datang di dunia di mana garis dan warna mulai bernapas. Saya Abyan, dan di sini, imajinasi tidak hanya diam di tempat—ia bergerak. Let’s bring ideas to life!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-12">
            <Button size="lg" className="rounded-full px-8 shadow-glow">Lihat Projects</Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">Hubungi Saya</Button>
          </div>

          {/* Ikon Social Media */}
          <div className="flex items-center justify-center md:justify-start gap-6">
            {[Github, Linkedin, Youtube, Instagram].map((Icon, idx) => (
              <a key={idx} href="#" className="p-3 rounded-full glass hover:text-primary transition-all">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-bounce"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}