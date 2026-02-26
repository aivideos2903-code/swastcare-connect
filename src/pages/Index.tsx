import { Bot, Search, Calendar, AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import heroImage from "@/assets/hero-illustration.png";

const quickActions = [
  {
    icon: Bot,
    title: "Check Symptoms",
    subtitle: "AI-powered analysis",
    path: "/symptom-checker",
    accent: true,
  },
  {
    icon: Search,
    title: "Find Doctors",
    subtitle: "Nearby specialists",
    path: "/doctors",
    accent: false,
  },
];

const upcomingAppointments = [
  {
    doctor: "Dr. Ananya Sharma",
    specialty: "General Physician",
    date: "Today, 4:00 PM",
    type: "In-clinic",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">SwastLink</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">U</span>
          </div>
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4"
        >
          <img src={heroImage} alt="AI Healthcare" className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h2 className="text-primary-foreground font-semibold text-sm">AI Health Assistant</h2>
            <p className="text-primary-foreground/70 text-xs mt-0.5">
              Get instant symptom analysis and connect with nearby doctors
            </p>
            <button
              onClick={() => navigate("/symptom-checker")}
              className="mt-2 text-xs font-semibold text-primary-foreground flex items-center gap-1"
            >
              Start now <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`rounded-xl p-4 text-left border transition-all active:scale-[0.98] ${
                action.accent
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-card text-card-foreground border-border"
              }`}
            >
              <action.icon className="w-6 h-6 mb-2" />
              <p className="font-semibold text-sm">{action.title}</p>
              <p className={`text-xs mt-0.5 ${action.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {action.subtitle}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-5 mt-5"
      >
        <button
          onClick={() => navigate("/emergency")}
          className="w-full flex items-center gap-3 bg-emergency/10 border border-emergency/20 rounded-xl p-3 text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-emergency/15 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-emergency" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emergency">Emergency</p>
            <p className="text-xs text-muted-foreground">Get immediate help</p>
          </div>
          <ChevronRight className="w-4 h-4 text-emergency" />
        </button>
      </motion.div>

      {/* Upcoming Appointments */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Upcoming</h3>
          <button
            onClick={() => navigate("/appointments")}
            className="text-xs text-primary font-medium"
          >
            View all
          </button>
        </div>

        {upcomingAppointments.map((apt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
              {apt.doctor.charAt(4)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{apt.doctor}</p>
              <p className="text-xs text-muted-foreground">{apt.specialty}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-primary">{apt.date}</p>
              <p className="text-xs text-muted-foreground">{apt.type}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
