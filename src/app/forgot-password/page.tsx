"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DiscordLogo } from "@/components/icons";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { resetPassword } = useAuth();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await resetPassword(email);
            setIsSubmitted(true);
            toast({
                title: "Email Terkirim",
                description: "Silakan periksa inbox Anda untuk instruksi reset password.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Gagal Mengirim",
                description: error.message || "Terjadi kesalahan. Pastikan email terdaftar.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <DiscordLogo className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
                    <CardDescription className="text-center">
                        Masukkan email Anda untuk menerima link reset password
                    </CardDescription>
                </CardHeader>

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nama@contoh.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mengirim...
                                    </>
                                ) : (
                                    "Kirim Link Reset"
                                )}
                            </Button>
                            <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Login
                            </Link>
                        </CardFooter>
                    </form>
                ) : (
                    <CardContent className="space-y-6">
                        <div className="text-center text-sm text-muted-foreground p-4 bg-secondary/50 rounded-lg">
                            Kami telah mengirimkan link untuk mereset password ke <strong>{email}</strong>.
                            Silakan cek email Anda (termasuk folder spam).
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/login">
                                Kembali ke Login
                            </Link>
                        </Button>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
