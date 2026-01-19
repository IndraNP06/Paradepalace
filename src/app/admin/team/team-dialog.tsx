"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    member?: any;
    onSuccess: () => void;
}

export function TeamDialog({ open, onOpenChange, member, onSuccess }: TeamDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [socials, setSocials] = useState({
        instagram: "",
        twitter: "",
        youtube: "",
        tiktok: ""
    });
    const { toast } = useToast();

    useEffect(() => {
        if (member) {
            setName(member.name || "");
            setRole(member.role || "");
            setPreviewUrl(member.avatar || "");
            setSocials({
                instagram: member.socials?.instagram || "",
                twitter: member.socials?.twitter || "",
                youtube: member.socials?.youtube || "",
                tiktok: member.socials?.tiktok || ""
            });
        } else {
            setName("");
            setRole("");
            setImageFile(null);
            setPreviewUrl("");
            setSocials({ instagram: "", twitter: "", youtube: "", tiktok: "" });
        }
    }, [member, open]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let avatarUrl = member?.avatar || "";

            if (imageFile) {
                const storageRef = ref(storage, `team-avatars/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                avatarUrl = await getDownloadURL(storageRef);
            }

            const data = {
                name,
                role,
                avatar: avatarUrl,
                socials,
                updatedAt: serverTimestamp()
            };

            if (member) {
                await updateDoc(doc(db, "team_members", member.id), data);
                toast({ title: "Berhasil", description: "Data anggota diperbarui." });
            } else {
                await addDoc(collection(db, "team_members"), {
                    ...data,
                    createdAt: serverTimestamp()
                });
                toast({ title: "Berhasil", description: "Anggota baru ditambahkan." });
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving member:", error);
            toast({
                title: "Error",
                description: "Gagal menyimpan data.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>{member ? "Edit Anggota" : "Tambah Anggota"}</DialogTitle>
                    <DialogDescription>
                        Isi detail anggota tim di bawah ini.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={previewUrl} />
                            <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Foto Profil</Label>
                            <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Contoh: Admin, Moderator" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Social Media (Opsional)</Label>
                        <Input
                            placeholder="Instagram URL"
                            value={socials.instagram}
                            onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                        />
                        <Input
                            placeholder="Twitter/X URL"
                            value={socials.twitter}
                            onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                        />
                        <Input
                            placeholder="YouTube URL"
                            value={socials.youtube}
                            onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                        />
                        <Input
                            placeholder="TikTok URL"
                            value={socials.tiktok}
                            onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
