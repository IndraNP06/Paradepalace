"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, User, Mail, Save } from "lucide-react"
import { updateProfile, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import { useAuth } from "@/context/auth-context"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const profileFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function SettingsProfilePage() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: user?.name || "",
            email: user?.email || "",
        },
        mode: "onChange",
    })

    async function onSubmit(data: ProfileFormValues) {
        if (!firebaseAuth.currentUser) return

        setIsLoading(true)
        try {
            // Update Display Name
            if (data.username !== user?.name) {
                await updateProfile(firebaseAuth.currentUser, {
                    displayName: data.username,
                })
            }

            // Update Email
            if (data.email !== user?.email) {
                // Use verifyBeforeUpdateEmail for security if possible, or updateEmail
                // updateEmail requires recent login. If it fails, we catch it.
                await updateEmail(firebaseAuth.currentUser, data.email)
            }

            toast({
                title: "Profile updated",
                description: "Your profile details have been updated successfully.",
            })

            // Force reload to reflect changes in context (since onAuthStateChanged listens)
            window.location.reload()

        } catch (error: any) {
            console.error(error)
            let errorMessage = "Failed to update profile."

            if (error.code === 'auth/requires-recent-login') {
                errorMessage = "For security, please log out and log in again to change your email."
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use by another account."
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address."
            }

            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how you will appear to others on the site.
                </p>
            </div>
            <div className="p-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input className="pl-9" placeholder="Your name" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input className="pl-9" placeholder="admin@example.com" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormDescription>
                                                Changing your email may require you to log in again.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {!isLoading && <Save className="mr-2 h-4 w-4" />}
                                    Update Profile
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
