import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: "लॉगिन त्रुटी",
          description: error.message || "चुकीचा ईमेल किंवा पासवर्ड",
          variant: "destructive",
        });
      } else {
        // Successful sign-in, now wait for isAdmin status to update from AuthContext
        // We'll give it a tiny delay to ensure the context updates
        setTimeout(async () => {
          // Note: we can't easily access the latest isAdmin here because it's from the context,
          // but if we redirected to /admin and they are not admin, they'll get kicked back.
          // For now, simple success toast.
          toast({
            title: "यशस्वी लॉगिन",
            description: "Admin Dashboard मध्ये स्वागत आहे!",
          });
          navigate("/admin");
        }, 500);
      }
    } catch (error: any) {
      console.error("Login catch error:", error);
      toast({
        title: "त्रुटी",
        description: error.message || "काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          मुख्यपृष्ठावर परत जा
        </Link>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              विचारमंच प्रशासक पॅनेलमध्ये प्रवेश करा
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ईमेल</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">पासवर्ड</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    पासवर्ड विसरलात?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "लॉगिन होत आहे..." : "लॉगिन करा"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                खाते नाही?{" "}
                <Link to="/admin-signup" className="text-primary hover:underline">
                  साइन अप करा
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
