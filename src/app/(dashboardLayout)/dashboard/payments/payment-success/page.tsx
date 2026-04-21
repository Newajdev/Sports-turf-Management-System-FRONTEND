"use client";

import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PaymentSuccessPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
            <div className="mb-6 rounded-full bg-green-500/10 p-4 animate-bounce">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight">Payment Successful!</h1>
            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                Your booking has been confirmed and your payment was processed successfully. 
                Get ready to hit the pitch!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Link 
                    href="/dashboard/bookings" 
                    className={cn(buttonVariants({ size: "lg" }), "px-8 shadow-lg shadow-primary/20")}
                >
                    <Calendar className="mr-2 h-5 w-5" />
                    View My Bookings
                </Link>
                <Link 
                    href="/" 
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-8")}
                >
                    Go Home
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </div>
    );
}
