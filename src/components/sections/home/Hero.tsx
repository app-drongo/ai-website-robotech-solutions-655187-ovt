'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type BackgroundPattern = 'dots' | 'grid' | 'gradient';

const DEFAULT_HERO = {
  badge: 'Powering the future of automation',
  title: 'Next-generation robotics',
  titleHighlight: 'for industry 4.0',
  subtitle:
    'Advanced AI-powered robotic solutions that transform manufacturing, logistics, and industrial operations with precision, efficiency, and intelligent automation.',
  primaryCTA: 'Explore Solutions',
  secondaryCTA: 'Schedule Demo',
  primaryCTAHref: '/solutions',
  secondaryCTAHref: '/demo',
  feature1Icon: 'zap',
  feature1Text: 'AI-powered precision',
  feature2Icon: 'shield',
  feature2Text: 'Industrial grade',
  feature3Icon: 'globe',
  feature3Text: 'Global deployment',
  trustedByText: 'Trusted by leading manufacturers worldwide',
  showTrustedLogos: true,
  backgroundPattern: 'dots' as BackgroundPattern,
  showAnimatedBadge: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'shield':
        return Shield;
      case 'globe':
        return Globe;
      default:
        return Sparkles;
    }
  };

  const Feature1Icon = getIcon(config.feature1Icon);
  const Feature2Icon = getIcon(config.feature2Icon);
  const Feature3Icon = getIcon(config.feature3Icon);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-background"
      ref={ref}
      data-editable="hero"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      />

      {/* Background Pattern */}
      {config.backgroundPattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03]" />
      )}
      {config.backgroundPattern === 'grid' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px]" />
      )}
      {config.backgroundPattern === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.05]" />
      )}

      {/* Floating gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
          {/* Animated Badge */}
          {config.showAnimatedBadge && (
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span data-editable="badge" className="text-muted-foreground">
                  {config.badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* Main Title */}
          <div className="max-w-4xl">
            <motion.h1
              className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <span data-editable="title" className="text-foreground">
                {config.title}
              </span>
            </motion.h1>

            <motion.span
              className="relative ml-3 inline-block"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <span
                data-editable="titleHighlight"
                className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              >
                {config.titleHighlight}
              </span>
              <svg
                className="absolute -right-2 -top-2 h-6 w-6 text-primary/60"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            data-editable="subtitle"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            {config.subtitle}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm">
              <Feature1Icon className="h-4 w-4 text-primary" />
              <span data-editable="feature1Text" className="text-muted-foreground">
                {config.feature1Text}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm">
              <Feature2Icon className="h-4 w-4 text-primary" />
              <span data-editable="feature2Text" className="text-muted-foreground">
                {config.feature2Text}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm">
              <Feature3Icon className="h-4 w-4 text-primary" />
              <span data-editable="feature3Text" className="text-muted-foreground">
                {config.feature3Text}
              </span>
            </div>
          </motion.div>

          {/* Floating Product Image */}
          <motion.div
            className="mt-12 mb-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative mx-auto h-48 w-64 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-border/20 flex items-center justify-center">
              <div className="text-6xl">🤖</div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent" />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="group px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate(config.primaryCTAHref)}
                data-editable-href="primaryCTAHref"
                data-href={config.primaryCTAHref}
              >
                <span data-editable="primaryCTA">{config.primaryCTA}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 backdrop-blur-sm text-base font-medium hover:bg-background/50 transition-all"
                onClick={() => navigate(config.secondaryCTAHref)}
                data-editable-href="secondaryCTAHref"
                data-href={config.secondaryCTAHref}
              >
                <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          {config.showTrustedLogos && (
            <motion.div
              className="mt-20 w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            >
              <p data-editable="trustedByText" className="mb-6 text-sm text-muted-foreground">
                {config.trustedByText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                {/* Placeholder for logos - in production these would be actual logos */}
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-8 w-24 rounded bg-muted-foreground/10" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
