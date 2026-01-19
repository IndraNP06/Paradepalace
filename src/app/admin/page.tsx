"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Users,
    Image as ImageIcon,
    Loader2,
    Calendar
} from "lucide-react";
import { collection, getCountFromServer, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";

interface StatData {
    teamCount: number;
    galleryCount: number;
}

interface RecentMember {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    createdAt?: any;
}

export default function AdminPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<StatData>({ teamCount: 0, galleryCount: 0 });
    const [recentMembers, setRecentMembers] = useState<RecentMember[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Simple auth check simulation
            await new Promise(resolve => setTimeout(resolve, 500));
            if (!isAuthenticated) {
                router.push("/login");
                return;
            }

            try {
                // Fetch Counts
                const teamCol = collection(db, "team_members");
                const galleryCol = collection(db, "gallery_items");

                const teamSnapshot = await getCountFromServer(teamCol);
                const gallerySnapshot = await getCountFromServer(galleryCol);

                setStats({
                    teamCount: teamSnapshot.data().count,
                    galleryCount: gallerySnapshot.data().count
                });

                // Fetch Recent Members
                const q = query(teamCol, orderBy("createdAt", "desc"), limit(5));
                const recentSnapshot = await getDocs(q);
                const recentData = recentSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as RecentMember[];
                setRecentMembers(recentData);

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [isAuthenticated, router]);

    if (!isAuthenticated && !isLoading) return null;

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-muted-foreground mt-1">
                        Ringkasan aktivitas dan konten website Parade Palace.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    title="Total Anggota Tim"
                    value={stats.teamCount}
                    description="Anggota aktif terdaftar"
                    icon={Users}
                />
                <StatsCard
                    title="Total Foto Galeri"
                    value={stats.galleryCount}
                    description="Foto di galeri komunitas"
                    icon={ImageIcon}
                />
                <StatsCard
                    title="Versi Sistem"
                    value="v1.0.0"
                    description="Parade Palace Web"
                    icon={Calendar}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Anggota Tim Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Avatar</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentMembers.length > 0 ? (
                                    recentMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={member.imageUrl} />
                                                    <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="font-medium">{member.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{member.role}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                            Belum ada data anggota.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, description, icon: Icon }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
