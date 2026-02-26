import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const appointments = [
  {
    doctor: "Dr. Ananya Sharma",
    specialty: "General Physician",
    date: "Today",
    time: "4:00 PM",
    type: "In-clinic",
    status: "Confirmed",
  },
  {
    doctor: "Dr. Rajesh Kumar",
    specialty: "Pediatrician",
    date: "Tomorrow",
    time: "10:30 AM",
    type: "Video Call",
    status: "Pending",
  },
];

const Appointments = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-1">Appointments</h1>
        <p className="text-sm text-muted-foreground">Your upcoming bookings</p>
      </div>

      <div className="px-5 space-y-3">
        {appointments.map((apt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                  {apt.doctor.charAt(4)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{apt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{apt.specialty}</p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  apt.status === "Confirmed"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {apt.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {apt.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {apt.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {apt.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Appointments;
