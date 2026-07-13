"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a turf?",
    answer: "Booking a turf is easy! Just browse available turfs on our platform, select your preferred date and time, and proceed to checkout. You will receive a confirmation email once your booking is successful."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee."
  },
  {
    question: "Are there any membership plans?",
    answer: "We offer various membership plans for regular players and teams. Members get exclusive discounts, priority booking, and access to premium facilities. Check our pricing page for more details."
  },
  {
    question: "What equipment is provided?",
    answer: "Most of our turfs provide basic equipment like goals and nets. However, players are expected to bring their own sports gear, including balls and proper footwear."
  },
  {
    question: "How do I contact support?",
    answer: "If you have any questions or issues, you can reach out to our support team via the contact form on our website or by emailing support@turfmanagement.com."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-background hover:bg-muted/50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 py-4 opacity-100" : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
