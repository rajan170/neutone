"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Music, Sparkles, Zap, Headphones, Mic } from "lucide-react";
import { BackgroundGradient } from "~/components/ui/background-gradient";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Navbar from "./navbar";
import Features from "./features";
import CTA from "./cta";
import Footer from "./footer";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:flex lg:items-center lg:gap-x-20 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 mb-8"
            >
              <motion.div 
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00ccb1]/10 to-[#7b61ff]/10 px-4 py-2 text-sm font-medium border border-[#00ccb1]/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-[#00ccb1]" />
                </motion.div>
                <span className="bg-gradient-to-r from-[#00ccb1] to-[#7b61ff] bg-clip-text text-transparent font-semibold">
                  AI-Powered Music Creation
                </span>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight sm:text-6xl md:text-8xl leading-[1.1] mb-6"
            >
              Create{" "}
              <motion.span 
                className="bg-gradient-to-r from-[#00ccb1] via-[#00a693] to-[#7b61ff] bg-clip-text text-transparent inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                stunning
              </motion.span>
              <br />
              music with AI
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground mt-6 text-xl leading-relaxed sm:text-2xl max-w-xl"
            >
              Transform your ideas into professional tracks in minutes. 
              <span className="text-foreground font-medium"> No musical experience needed</span> – 
              just pure creativity unleashed.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/auth/sign-up"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "px-10 py-4 text-lg font-semibold bg-gradient-to-r from-[#00ccb1] to-[#7b61ff] hover:from-[#00a693] hover:to-[#6b51e6] shadow-2xl hover:shadow-[#00ccb1]/25 transition-all duration-300 rounded-xl border-0"
                  )}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start creating now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#demo"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "px-10 py-4 text-lg group border-2 hover:bg-gradient-to-r hover:from-[#00ccb1]/10 hover:to-[#7b61ff]/10 transition-all duration-300 rounded-xl"
                  )}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  Watch demo
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
            >
              <motion.div 
                className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-700 dark:text-green-300 font-medium">No credit card required</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">Free tier available</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeInRight}
            className="mt-16 w-full max-w-2xl flex-1 lg:mt-0 lg:max-w-none"
          >
            <BackgroundGradient 
              className="rounded-3xl border bg-background/80 p-8 shadow-2xl backdrop-blur-xl"
              animate={true}
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-[#0ea5e9] via-[#7c3aed] to-[#f59e0b] overflow-hidden">
                {/* Main center visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="relative"
                  >
                    <div className="h-32 w-32 rounded-full border-4 border-white/40 backdrop-blur-sm bg-white/10 flex items-center justify-center shadow-2xl">
                      <motion.div
                        animate={{ rotate: [-360, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      >
                        <Music className="h-16 w-16 text-white drop-shadow-lg" />
                      </motion.div>
                    </div>
                    
                    {/* Pulsing rings */}
                    {[1, 2, 3].map((ring) => (
                      <motion.div
                        key={ring}
                        className="absolute inset-0 rounded-full border-2 border-white/30"
                        animate={{
                          scale: [1, 1.5 + ring * 0.3, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: ring * 0.5,
                        }}
                        style={{
                          width: `${100 + ring * 20}%`,
                          height: `${100 + ring * 20}%`,
                          left: `${-ring * 10}%`,
                          top: `${-ring * 10}%`,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Floating instruments */}
                {[
                  { Icon: Headphones, delay: 0, x: 80, y: 60 },
                  { Icon: Mic, delay: 1, x: 240, y: 100 },
                  { Icon: Zap, delay: 2, x: 160, y: 180 },
                ].map(({ Icon, delay, x, y }, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x, y, opacity: 0 }}
                    animate={{
                      y: [y, y - 30, y],
                      opacity: [0.4, 1, 0.4],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: delay,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>
                ))}
                
                {/* Floating music notes with better positioning */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/60 text-2xl font-bold select-none"
                    initial={{
                      x: Math.random() * 400,
                      y: Math.random() * 300,
                      rotate: Math.random() * 360,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.2, 0.8, 0.2],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeInOut",
                    }}
                  >
                    {['♪', '♫', '♬', '𝄞'][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}

                {/* Waveform visualization */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between gap-1 h-16">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/40 rounded-full"
                        style={{ width: '4px' }}
                        animate={{
                          height: [
                            Math.random() * 30 + 10,
                            Math.random() * 60 + 20,
                            Math.random() * 30 + 10,
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>

        {/* Enhanced Background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Main gradient blob */}
          <div className="absolute left-1/2 top-[-15rem] -translate-x-1/2 transform-gpu">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="aspect-[1155/678] w-[80rem] bg-gradient-to-tr from-[#00ccb1] via-[#00a693] to-[#7b61ff] opacity-20 blur-3xl"
              style={{ clipPath: "polygon(74% 44%, 100% 60%, 97% 86%, 60% 100%, 24% 86%, 0 60%, 26% 44%, 50% 0)" }}
            />
          </div>
          
          {/* Secondary gradient blobs */}
          <div className="absolute right-0 top-1/4 transform-gpu">
            <motion.div
              animate={{
                rotate: [360, 0],
                x: [0, -100, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-96 w-96 bg-gradient-to-br from-[#7b61ff] to-[#00ccb1] opacity-10 blur-3xl rounded-full"
            />
          </div>
          
          <div className="absolute left-0 bottom-1/4 transform-gpu">
            <motion.div
              animate={{
                rotate: [0, -360],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-80 w-80 bg-gradient-to-tl from-[#00ccb1] to-[#0ea5e9] opacity-15 blur-3xl rounded-full"
            />
          </div>
          
          {/* Animated grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]">
            <motion.div
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="h-full w-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#00ccb1] to-[#7b61ff] opacity-20"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      <Features />
      <CTA />
      <Footer />
    </div>
  );
}