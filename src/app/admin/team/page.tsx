"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamDialog } from "./team-dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminTeamPage() {
    const { isAuthenticated } = useAuth();
    const [team, setTeam] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any | null>(null);
    const { toast } = useToast();

    // Fetch team members
    const fetchTeam = async () => {
        setIsLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "team_members"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort: CreatedAt Ascending (Oldest First)
            data.sort((a: any, b: any) => {
                const dateA = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt || 0).getTime();
                const dateB = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt || 0).getTime();
                return dateA - dateB;
            });

            setTeam(data);
        } catch (error) {
            console.error("Error fetching team:", error);
            toast({
                title: "Error",
                description: "Gagal mengambil data tim.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchTeam();
        }
    }, [isAuthenticated]);

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus anggota ini?")) return;
        try {
            await deleteDoc(doc(db, "team_members", id));
            toast({
                title: "Berhasil",
                description: "Anggota tim dihapus.",
            });
            fetchTeam();
        } catch (error) {
            console.error("Error deleting member:", error);
            toast({
                title: "Error",
                description: "Gagal menghapus anggota.",
                variant: "destructive"
            });
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Manajemen Tim</h2>
                <Button onClick={() => { setEditingMember(null); setIsDialogOpen(true); }}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Avatar</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Loading...
                                </TableCell>
                            </TableRow>
                        ) : team.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    Belum ada anggota tim.
                                </TableCell>
                            </TableRow>
                        ) : (
                            team.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => { setEditingMember(member); setIsDialogOpen(true); }}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(member.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <TeamDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                member={editingMember}
                onSuccess={() => { setIsDialogOpen(false); fetchTeam(); }}
            />
        </div>
    );
}
