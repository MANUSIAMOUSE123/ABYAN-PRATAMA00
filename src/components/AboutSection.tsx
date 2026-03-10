import { motion } from 'framer-motion';
import { Code2, Video, Coffee, Rocket } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { icon: Code2, value: '1+', label: 'Projects Selesai' },
    { icon: Video, value: '50+', label: 'Video Konten' },
    { icon: Coffee, value: '10+ sehari', label: 'Cangkir Kopi' },
    { icon: Rocket, value: '2+', label: 'Minggu Pengalaman' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* JUDUL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Tentang Saya</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Mengenal Lebih Dekat
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* --- BAGIAN FOTO (DENGAN ANIMASI) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* ANIMASI MELAYANG DI SINI */}
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden glass shadow-card"
                animate={{
                  y: [0, -15, 0], // Bergerak naik turun pelan
                }}
                transition={{
                  duration: 5,     // Lebih lambat dari Hero agar terasa rileks
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <img 
                    // Perbaikan Path: /public dihapus agar gambar terbaca
                    src="/foto akun3.jpg" 
                    alt="Muhammad Abyan Pratama" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </motion.div>

              {/* CARD PENGALAMAN (IKUT MELAYANG) */}
              <motion.div 
                className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-card"
                animate={{
                  y: [0, 10, 0], // Bergerak berlawanan arah dengan foto
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <p className="font-display font-bold text-2xl text-gradient">2+ Minggu</p>
                <p className="text-sm text-muted-foreground">Pengalaman</p>
              </motion.div>
            </div>
          </motion.div>

          {/* --- BAGIAN TEKS --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold">
              Passionate Art & Content Creator
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              "Fullstack Developer, Art Enthusiast, & Content Creator. Baru beberapa hari menjadi penggiat coding (pemula), saya telah menjembatani kode dengan estetika untuk membangun solusi digital yang inovatif. Saya memiliki passion dalam mengajar dan berbagi perspektif kreatif melalui konten digital."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Selain coding, saya juga aktif sebagai Content Creator, berbagi pengetahuan 
              tentang pemrograman dan teknologi melalui berbagai platform.
            </p>

            {/* GRID STATS */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }} // Efek saat kursor di atas kotak
                  className="p-4 glass rounded-xl text-center hover:shadow-card-hover transition-shadow cursor-default"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}