"use client";

import { motion } from "framer-motion";
import { Music, Zap, Sparkles, Wand2 } from "lucide-react";

const features = [
  {
    name: "AI-Powered Generation",
    description: "Transform text descriptions into full musical compositions using advanced AI models.",
    icon: Wand2,
  },
  {
    name: "Lightning Fast",
    description: "Generate professional-quality tracks in minutes, not hours.",
    icon: Zap,
  },
  {
    name: "Multiple Styles",
    description: "From hip-hop to classical, create music in any genre or style you can imagine.",
    icon: Music,
  },
  {
    name: "Creative Control",
    description: "Fine-tune every aspect with advanced parameters and custom prompts.",
    icon: Sparkles,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Everything you need to create amazing music
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mt-6 text-lg leading-8"
          >
            Neutone combines cutting-edge AI with intuitive design to make music creation accessible to everyone.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
