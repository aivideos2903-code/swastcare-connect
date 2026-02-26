import { User, Settings, FileText, Shield, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: User, label: "Personal Information", subtitle: "Name, phone, email" },
  { icon: FileText, label: "Health Records", subtitle: "Symptom reports & history" },
  { icon: Shield, label: "Privacy & Security", subtitle: "Data consent, permissions" },
  { icon: Settings, label: "Settings", subtitle: "Notifications, preferences" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">U</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Guest User</h1>
            <p className="text-sm text-muted-foreground">Sign in to access all features</p>
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-semibold mb-6">
          Sign in with Google
        </button>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full flex items-center gap-3 bg-card rounded-xl border border-border p-4 text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <item.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <button className="w-full flex items-center gap-3 mt-4 p-4 rounded-xl text-left text-emergency">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
