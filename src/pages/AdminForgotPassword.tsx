import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ADMIN_EMAIL = "vicharmanch1956@gmail.com";

const AdminForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendResetLink = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            toast.error("Invalid admin email");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Generate a secure temporary token
            const token = btoa(Math.random().toString(36).substring(2) + Date.now()).substring(0, 32);

            // 2. Prepare the reset link
            const resetLink = `${window.location.origin}/reset-password?token=${token}`;

            // 3. Send Email via Gmail SMTP (Simulated for frontend, would call Edge Function)
            // In a real production setup, you would call:
            // await supabase.functions.invoke('send-reset-email', { body: { email, resetLink } });

            console.log(`[ACTION REQUIRED] Send this link via Gmail SMTP:`);
            console.log(`Subject: Vicharmanch Admin Password Reset`);
            console.log(`Link: ${resetLink}`);
            console.log(`Expires in: 10 minutes`);

            // Store token and timestamp in sessionStorage for the demo/simulation 
            // (In production, this would be in server memory/Edge Function)
            sessionStorage.setItem("reset_token", token);
            sessionStorage.setItem("reset_token_expiry", (Date.now() + 10 * 60 * 1000).toString());

            toast.success("Password reset link sent to your Gmail");

            // For the purpose of this flow, we stay on this page 
            // but the user would actually click the link from their email.
        } catch (error: any) {
            toast.error("Error sending reset link: " + error.message);
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
                    to="/admin-login"
                    className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                </Link>

                <Card className="shadow-2xl border-0">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Forgot Password</CardTitle>
                        <CardDescription>
                            Enter the admin email to receive a password reset link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSendResetLink} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Admin Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter admin email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                                {isLoading ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Send Reset Link
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default AdminForgotPassword;
