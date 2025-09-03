"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Music, Sparkles } from "lucide-react";
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
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Hero() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:flex lg:items-center lg:gap-x-16 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                AI-Powered Music Creation
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              Create captivating{" "}
              <span className="bg-gradient-to-r from-[#00ccb1] to-[#7b61ff] bg-clip-text text-transparent">
                music with AI
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground mt-6 text-lg leading-8 sm:text-xl"
            >
              Neutone helps you turn ideas into finished tracks in minutes. Minimal UI,
              powerful results. No musical experience required.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/auth/sign-up"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                )}
              >
                Get started free
              </Link>
              <Link
                href="#demo"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "px-8 py-3 text-lg group"
                )}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch demo
              </Link>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                Free tier available
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 w-full max-w-xl flex-1 lg:mt-0 lg:max-w-none"
          >
            <BackgroundGradient 
              className="rounded-3xl border bg-background/70 p-6 shadow-2xl backdrop-blur"
              animate={true}
            >
              <div className="relative aspect-video w-full rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0ea5e9] via-[#7c3aed] to-[#f59e0b] opacity-90 overflow-hidden">
                {/* Animated music visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-24 w-24 rounded-full border-4 border-white/30 flex items-center justify-center"
                  >
                    <Music className="h-12 w-12 text-white" />
                  </motion.div>
                </div>
                
                {/* Floating music notes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-4 w-4 text-white/60"
                    initial={{
                      x: Math.random() * 300,
                      y: Math.random() * 200,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  >
                    ♪
                  </motion.div>
                ))}
              </div>
            </BackgroundGradient>
          </motion.div>
        </div>

        {/* Background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] -translate-x-1/2 transform-gpu blur-3xl">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#00ccb1] to-[#7b61ff] opacity-20"
              style={{ clipPath: "polygon(74% 44%, 100% 60%, 97% 86%, 60% 100%, 24% 86%, 0 60%, 26% 44%, 50% 0)" }}
            />
          </div>
        </div>
      </section>

      <Features />
      <CTA />
      <Footer />
    </div>
  );
}


