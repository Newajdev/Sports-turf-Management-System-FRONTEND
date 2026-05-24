"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TurfGalleryProps {
  images: string[];
  turfName: string;
}

export function TurfGallery({ images, turfName }: TurfGalleryProps) {
  const galleryImages =
    images.length > 0 ? images : ["/images/turf-multi.png"];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api?.scrollTo(index),
    [api],
  );

  return (
    <div className="relative w-full h-80">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {galleryImages.map((img, index) => (
            <CarouselItem key={`${img}-${index}`}>
              <div className="relative w-full aspect-21/9 min-h-60 md:min-h-105">
                <Image
                  src={img}
                  alt={`${turfName} – photo ${index + 1}`}
                  width={10000}
                  height={30}
                  className="object-cover h-100"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {galleryImages.length > 1 && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  current === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>

          <div className="hidden md:flex absolute top-24 right-4 gap-2 z-10">
            {galleryImages.slice(0, 5).map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                className={cn(
                  "relative h-14 w-20 rounded-lg overflow-hidden border-2 transition-all block",
                  current === index
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/30 opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
