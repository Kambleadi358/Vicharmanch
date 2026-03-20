import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, ArrowLeft, Save, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    useEffect(() => {
        const validateToken = () => {
            const storedToken = sessionStorage.getItem("reset_token");
            const expiry = sessionStorage.getItem("reset_token_expiry");

            if (!token || token !== storedToken) {
                setIsTokenValid(false);
                return;
            }

            if (expiry && Date.now() > parseInt(expiry)) {
                setIsTokenValid(false);
                sessionStorage.removeItem("reset_token");
                sessionStorage.removeItem("reset_token_expiry");
                return;
            }

            setIsTokenValid(true);
        };

        validateToken();
    }, [token]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Update Password in Supabase Auth
            // In production, this would use a secure Edge Function with Service Role permissions
            // OR Supabase's native recovery flow if integrated.
            const { error: authError } = await supabase.auth.updateUser({
                password: password
            });

            if (authError) {
                if (authError.message.includes("Auth session missing")) {
                    throw new Error("Security session expired. Please request a new link.");
                }
                throw authError;
            }

            // 2. Invalidate token (Simulated server memory cleanup)
            sessionStorage.removeItem("reset_token");
            sessionStorage.removeItem("reset_token_expiry");

            toast.success("Password updated successfully!");
            navigate("/admin-login");
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    if (isTokenValid === false) {
        return (
            <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-2xl border-0">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl text-destructive">Invalid Link</CardTitle>
                        <CardDescription>
                            This password reset link is invalid or has expired.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Link to="/admin-forgot-password">
                            <Button variant="outline" className="w-full">
                                Request New Link
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isTokenValid === null) {
        return (
            <div className="min-h-screen hero-gradient flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

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
                    Cancel and return to Login
                </Link>

                <Card className="shadow-2xl border-0">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Reset Password</CardTitle>
                        <CardDescription>
                            Set a new secure password for your admin account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleReset} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Min 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repeat new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                                {isLoading ? (
                                    "Updating..."
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Reset Password
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

export default ResetPassword;
