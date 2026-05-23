interface StadiumHeroBackgroundProps {
  variant?: "page" | "home";
}

export function StadiumHeroBackground({
  variant = "page",
}: StadiumHeroBackgroundProps) {
  const overlayClass =
    variant === "home"
      ? "bg-gradient-to-b from-black/80 via-black/40 to-background"
      : "bg-gradient-to-b from-black/80 via-black/20 to-black/60";

  return (
    <div className="absolute inset-0 z-0">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 ${
          variant === "home" ? "scale-110" : "scale-105"
        }`}
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      {variant === "home" && <div className="absolute inset-0 bg-black/60" />}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] opacity-30" />
    </div>
  );
}
