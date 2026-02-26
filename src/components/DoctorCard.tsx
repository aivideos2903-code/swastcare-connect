import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  clinic: string;
  distance: string;
  rating: number;
  avatar: string;
  nextSlot: string;
  available: boolean;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-4 animate-slide-up">
      <div className="flex gap-3">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-xl font-bold text-accent-foreground shrink-0">
          {doctor.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{doctor.name}</h3>
          <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
          <p className="text-xs text-muted-foreground">{doctor.clinic} · {doctor.experience} yrs exp</p>
        </div>
        <div className="flex items-start gap-1 text-sm">
          <Star className="w-4 h-4 text-warning fill-warning" />
          <span className="font-semibold text-foreground">{doctor.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {doctor.distance}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Next: {doctor.nextSlot}
        </span>
      </div>

      <Button
        className="w-full mt-3"
        size="sm"
        onClick={() => navigate(`/book/${doctor.id}`)}
      >
        Book Appointment
      </Button>
    </div>
  );
};

export default DoctorCard;
