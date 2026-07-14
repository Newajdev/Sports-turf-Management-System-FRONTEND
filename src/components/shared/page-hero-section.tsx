import { StadiumHeroBackground } from "@/components/shared/stadium-hero-background";

interface PageHeroSectionProps {
  title: string;
  description: string;
  badge?: string;
}

export default function PageHeroSection({
  title,
  description,
  badge,
}: PageHeroSectionProps) {
  const titleWords = title.split(" ");

  return (
    <section className="relative  pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-black flex items-center justify-center">
      <StadiumHeroBackground variant="page" />

      <div className="container relative z-20 mx-auto px-4 md:px-6 text-center space-y-6">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="text-[0.65rem] font-black text-primary uppercase tracking-[0.3em] italic">
              {badge}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-700">
          {titleWords.map((word, i) => (
            <span key={i}>
              {i === titleWords.length - 1 ? (
                <span className="text-primary italic">{word}</span>
              ) : (
                word + " "
              )}
            </span>
          ))}
        </h1>

        <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
