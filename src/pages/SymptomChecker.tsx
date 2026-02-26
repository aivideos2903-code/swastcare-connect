import { useState, useRef, useEffect } from "react";
import { Send, Bot, ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  riskLevel?: "low" | "moderate" | "high";
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Hello! I'm SwastBot, your AI health assistant. I'll help you understand your symptoms.\n\nPlease tell me your **name** to get started.",
  },
];

const botResponses: { trigger: string; response: string; riskLevel?: "low" | "moderate" | "high" }[] = [
  {
    trigger: "",
    response: "Thank you! Now, could you tell me your **age** and **gender**?",
  },
  {
    trigger: "",
    response: "Got it. What **symptoms** are you currently experiencing? Please describe them in detail.",
  },
  {
    trigger: "",
    response: "How long have you been experiencing these symptoms? And on a scale of **0 to 10**, how severe would you rate them?",
  },
  {
    trigger: "",
    response: "Do you have any **existing medical conditions** or known **allergies**?",
  },
  {
    trigger: "",
    response:
      "Based on your symptoms, I'm analyzing the risk level...\n\n🟡 **Moderate Risk**\n\nYour symptoms suggest a condition that should be evaluated by a doctor within 24-48 hours.\n\n**Recommended Actions:**\n- Book an appointment with a nearby General Physician\n- Stay hydrated and rest well\n- Monitor your symptoms\n\nWould you like me to help you find a **nearby doctor**?",
    riskLevel: "moderate",
  },
];

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (step < botResponses.length) {
        const resp = botResponses[step];
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: resp.response,
          riskLevel: resp.riskLevel,
        };
        setMessages((prev) => [...prev, botMsg]);
        setStep((s) => s + 1);
      } else {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content: "I'll help you find a doctor nearby. Redirecting you to the doctor search...",
        };
        setMessages((prev) => [...prev, botMsg]);
        setTimeout(() => navigate("/doctors"), 1500);
      }
      setIsTyping(false);
    }, 1200);
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case "low": return "border-success/30 bg-success/5";
      case "moderate": return "border-warning/30 bg-warning/5";
      case "high": return "border-emergency/30 bg-emergency/5";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 pt-12 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">SwastBot</h1>
          <p className="text-xs text-muted-foreground">AI Symptom Checker</p>
        </div>
      </div>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 pb-32 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "chat-bubble-user"
                    : `chat-bubble-bot ${msg.riskLevel ? getRiskColor(msg.riskLevel) + " border" : ""}`
                }`}
              >
                {msg.riskLevel === "high" && (
                  <div className="flex items-center gap-1.5 mb-2 text-emergency font-semibold text-xs">
                    <AlertTriangle className="w-3.5 h-3.5" /> EMERGENCY
                  </div>
                )}
                {msg.content}
                {msg.riskLevel === "moderate" && (
                  <button
                    onClick={() => navigate("/doctors")}
                    className="mt-3 w-full bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-lg"
                  >
                    Find Nearby Doctor
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="chat-bubble-bot px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-3">
        <div className="flex gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SymptomChecker;
