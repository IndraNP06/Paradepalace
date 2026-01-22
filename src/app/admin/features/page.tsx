"use client";

import { useFeatureSettings } from "@/hooks/use-feature-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { specialRoles } from "@/lib/data";

export default function AdminFeaturesPage() {
    const { settings, loading, error, updateSettings } = useFeatureSettings();

    const handleToggle = (key: keyof typeof settings) => {
        updateSettings({ [key]: !settings[key] });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-500">
                Error loading settings: {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Feature Management</h1>
                <p className="text-muted-foreground">
                    Control the visibility of sections on the public Features page.
                </p>
            </div>
            <Separator />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Sistem Peringkat</CardTitle>
                        <CardDescription>Toggle visibility of the Ranking System section.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Label htmlFor="ranking-system">Visible</Label>
                        <Switch
                            id="ranking-system"
                            checked={settings.rankingSystem}
                            onCheckedChange={() => handleToggle("rankingSystem")}
                        />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Role Spesial</CardTitle>
                        <CardDescription>
                            Atur visibilitas bagian Role Spesial dan setiap role di dalamnya.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="special-roles">Tampilkan Bagian Ini</Label>
                            <Switch
                                id="special-roles"
                                checked={settings.specialRoles}
                                onCheckedChange={() => handleToggle("specialRoles")}
                            />
                        </div>

                        {settings.specialRoles && (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4 border-t">
                                {specialRoles.map((role) => (
                                    <div key={role.name} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10">
                                        <div className="flex items-center gap-2">
                                            <role.icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{role.name}</span>
                                        </div>
                                        <Switch
                                            checked={!settings.hiddenRoleNames?.includes(role.name)}
                                            onCheckedChange={(checked) => {
                                                const currentHidden = settings.hiddenRoleNames || [];
                                                let newHidden;
                                                if (checked) {
                                                    // Unhide: remove from array
                                                    newHidden = currentHidden.filter(n => n !== role.name);
                                                } else {
                                                    // Hide: add to array
                                                    newHidden = [...currentHidden, role.name];
                                                }
                                                updateSettings({ hiddenRoleNames: newHidden });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bot Eksklusif</CardTitle>
                        <CardDescription>Toggle visibility of the Exclusive Bots section.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Label htmlFor="exclusive-bots">Visible</Label>
                        <Switch
                            id="exclusive-bots"
                            checked={settings.exclusiveBots}
                            onCheckedChange={() => handleToggle("exclusiveBots")}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Global Leaderboard</CardTitle>
                        <CardDescription>Toggle visibility of the Leaderboard section.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <Label htmlFor="global-leaderboard">Visible</Label>
                        <Switch
                            id="global-leaderboard"
                            checked={settings.globalLeaderboard}
                            onCheckedChange={() => handleToggle("globalLeaderboard")}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
