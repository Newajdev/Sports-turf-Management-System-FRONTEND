"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Mail, Edit3, Star, Trophy, ArrowRight } from "lucide-react";
import Image from "next/image";

interface MyTurfProfileProps {
    turf: any;
    onEditClick: () => void;
}

const MyTurfProfile = ({ turf, onEditClick }: MyTurfProfileProps) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Hero Section */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-2xl">
                <Image 
                    src={turf.images?.[0] || "/placeholder-turf.jpg"} 
                    alt={turf.name} 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-white tracking-tight">{turf.name}</h1>
                            <Badge className="bg-primary text-primary-foreground font-bold">
                                {turf.turfStatus}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{turf.address}</span>
                        </div>
                    </div>
                    
                    <Button 
                        onClick={onEditClick}
                        className="bg-white text-black hover:bg-white/90 font-bold px-6 py-6 rounded-2xl flex items-center gap-2 shadow-xl shrink-0"
                    >
                        <Edit3 className="h-5 w-5" />
                        Edit Venue Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <Card className="border-none shadow-premium-subtle rounded-3xl bg-card/50 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-primary" />
                                About this Venue
                            </h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {turf.description || "No description provided."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold px-2">Venue Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {turf.images?.slice(1).map((img: string, idx: number) => (
                                <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                                    <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <Card className="border-none shadow-premium rounded-3xl bg-primary text-primary-foreground overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <div>
                                <p className="text-primary-foreground/70 text-sm font-bold uppercase tracking-wider">Pricing</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-4xl font-black">{Number(turf.hourlyRate).toLocaleString()}</span>
                                    <span className="text-lg font-medium opacity-80">BDT / Hour</span>
                                </div>
                            </div>
                            
                            <div className="h-px bg-white/20" />
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 fill-white text-white" />
                                    <span className="text-xl font-bold">{turf.rating}</span>
                                </div>
                                <span className="text-sm font-medium opacity-70">{turf.reviewCount} Reviews</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operational Details */}
                    <Card className="border-none shadow-premium-subtle rounded-3xl bg-card/50">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="font-bold flex items-center gap-2 border-b pb-4 mb-2">
                                <Clock className="h-5 w-5 text-primary" />
                                Logistics
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground font-medium">Business Hours</span>
                                    <span className="font-bold">{turf.openingTime} - {turf.closingTime}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground font-medium">Weekly Holidays</span>
                                    <span className="font-bold text-destructive">
                                        {turf.weeklyOffDays?.length > 0 ? turf.weeklyOffDays.join(", ") : "None"}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{turf.contactNumber?.[0] || "No contact info"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span className="font-medium truncate">{turf.emailAddress || "No email info"}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sport Types */}
                    <div className="flex flex-wrap gap-2">
                        {turf.sportTypes?.map((sport: any) => (
                            <Badge key={sport.id} variant="secondary" className="px-3 py-1 bg-muted/50 border-none font-bold text-primary">
                                {sport.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTurfProfile;
