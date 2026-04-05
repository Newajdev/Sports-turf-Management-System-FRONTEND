"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";


interface TypeImage {
  images: string[];
}

export function CarouselSpacing({ images }: TypeImage) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className="rounded-0">
            <Card className="w-full h-75 md:h-125 py-0 rounded-none border-none">
              <CardContent className="p-0 overflow-hidden relative h-full">
                <Image
                  src={img}
                  alt={`Turf ${index + 1}`}
                  fill
                  className="object-cover object-center rounded-0"
                  quality={100}
                  priority={index === 0}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
