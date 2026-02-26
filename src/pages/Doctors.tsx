import { useState } from "react";
import { Search, SlidersHorizontal, List, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import DoctorCard from "@/components/DoctorCard";
import { mockDoctors } from "@/data/mockDoctors";

const specialties = ["All", "General", "Pediatrics", "Dermatology", "Cardiology", "Gynecology"];
const distances = ["5 km", "10 km", "25 km"];

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [activeDistance, setActiveDistance] = useState("25 km");
  const [view, setView] = useState<"list" | "map">("list");

  const filtered = mockDoctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = activeSpecialty === "All" || d.specialty.toLowerCase().includes(activeSpecialty.toLowerCase());
    return matchSearch && matchSpecialty;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold text-foreground mb-4">Find Doctors</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* View toggle + Distance */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" /> List
            </button>
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                view === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> Map
            </button>
          </div>
          <div className="flex gap-1">
            {distances.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDistance(d)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeDistance === d
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Specialty filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeSpecialty === s
                  ? "bg-secondary text-secondary-foreground border border-primary/30"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-5">
        {view === "list" ? (
          <div className="flex flex-col gap-3">
            {filtered.map((doctor, i) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">No doctors found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Map view requires location access</p>
              <p className="text-xs mt-1">Enable location to see doctors nearby</p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Doctors;
