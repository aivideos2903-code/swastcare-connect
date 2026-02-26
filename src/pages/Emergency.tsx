import { AlertTriangle, Phone, MapPin, ArrowLeft, Hospital } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const hospitals = [
  { name: "District General Hospital", distance: "3.2 km", phone: "108" },
  { name: "Community Health Center", distance: "5.7 km", phone: "102" },
  { name: "Rural Primary Care Unit", distance: "1.8 km", phone: "104" },
];

const Emergency = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-emergency">Emergency</h1>
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-5 mb-6 gradient-emergency rounded-2xl p-6 text-center"
      >
        <AlertTriangle className="w-10 h-10 text-emergency-foreground mx-auto mb-3" />
        <h2 className="text-lg font-bold text-emergency-foreground mb-1">Need Immediate Help?</h2>
        <p className="text-sm text-emergency-foreground/80 mb-4">
          Call emergency services or visit the nearest hospital
        </p>
        <a
          href="tel:108"
          className="inline-flex items-center gap-2 bg-emergency-foreground/20 backdrop-blur-sm text-emergency-foreground font-semibold px-6 py-3 rounded-xl text-sm"
        >
          <Phone className="w-4 h-4" /> Call 108 — Ambulance
        </a>
      </motion.div>

      {/* Nearby Hospitals */}
      <div className="px-5">
        <h3 className="font-semibold text-foreground mb-3">Nearest Hospitals</h3>
        <div className="space-y-3">
          {hospitals.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emergency/10 flex items-center justify-center">
                <Hospital className="w-5 h-5 text-emergency" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{h.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {h.distance}
                </p>
              </div>
              <a
                href={`tel:${h.phone}`}
                className="w-9 h-9 rounded-lg bg-emergency/10 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 text-emergency" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6">
        <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Emergency;
