"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BackgroundGradient } from "~/components/ui/background-gradient";

export default function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <BackgroundGradient className="rounded-3xl p-8 sm:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to create your next hit?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-8"
            >
              Join thousands of creators who are already making incredible music with Neutone.
              Start your journey today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button size="lg" asChild>
                <Link href="/auth/sign-up">Get started for free</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="#features">Learn more</Link>
              </Button>
            </motion.div>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}
