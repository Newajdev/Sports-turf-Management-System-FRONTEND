import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Regular Player",
    content: "The booking process is seamless and the turfs are top-notch. Highly recommended for weekend games with friends!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Team Captain",
    content: "We've been using Turf Management for our weekly practices. It's incredibly reliable and easy to find available slots.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Tournament Organizer",
    content: "Managing multiple matches was a nightmare until we found this platform. It simplifies everything from scheduling to payments.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What Our Players Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Don't just take our word for it. Here's what our community of players and organizers has to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? "fill-primary text-primary" : "text-muted"}`} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 text-lg italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
