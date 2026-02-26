import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Video, Building2, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { mockDoctors } from "@/data/mockDoctors";
import { Button } from "@/components/ui/button";

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "4:00 PM", "5:30 PM"];

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = mockDoctors.find((d) => d.id === id) || mockDoctors[0];
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<"clinic" | "video">("clinic");
  const [booked, setBooked] = useState(false);

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">Appointment Booked!</h2>
          <p className="text-sm text-muted-foreground mb-1">{doctor.name}</p>
          <p className="text-sm text-muted-foreground mb-6">
            {selectedSlot} · {visitType === "clinic" ? "In-clinic" : "Video call"}
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Book Appointment</h1>
      </div>

      {/* Doctor Info */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-xl border border-border p-4 flex gap-3">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-xl font-bold text-accent-foreground">
            {doctor.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{doctor.name}</h2>
            <p className="text-sm text-primary">{doctor.specialty}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {doctor.clinic} · {doctor.distance}
            </p>
          </div>
        </div>
      </div>

      {/* Visit Type */}
      <div className="px-5 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Visit Type</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setVisitType("clinic")}
            className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              visitType === "clinic"
                ? "border-primary bg-secondary text-secondary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" /> In-Clinic
          </button>
          <button
            onClick={() => setVisitType("video")}
            className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              visitType === "video"
                ? "border-primary bg-secondary text-secondary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <Video className="w-4 h-4" /> Video Call
          </button>
        </div>
      </div>

      {/* Time Slots */}
      <div className="px-5 mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-3">Available Slots — Today</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`py-2.5 rounded-lg text-xs font-medium border transition-all ${
                selectedSlot === slot
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="px-5">
        <Button
          className="w-full"
          size="lg"
          disabled={!selectedSlot}
          onClick={() => setBooked(true)}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookAppointment;
