"use client"

import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { GalleryDialog } from "./gallery-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Pencil, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface GalleryItem {
    id: string
    description: string
    imageUrl: string
}

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const fetchItems = async () => {
        try {
            setLoading(true)
            const q = query(collection(db, "gallery_items"), orderBy("createdAt", "desc"))
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as GalleryItem[]
            setItems(data)
        } catch (error: any) {
            console.error("Error fetching gallery items:", error)
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);

            // Fallback: fetch without sorting if index missing
            try {
                const querySnapshot = await getDocs(collection(db, "gallery_items"))
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as GalleryItem[]
                setItems(data)
            } catch (innerError) {
                toast({ variant: "destructive", title: "Gagal memuat galeri" })
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "gallery_items", id))
            toast({
                title: "Foto dihapus",
                description: "Item galeri telah dihapus permanen.",
            })
            fetchItems()
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Gagal menghapus",
                description: "Terjadi kesalahan saat menghapus data.",
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Galeri</h1>
                    <p className="text-muted-foreground">
                        Kelola foto-foto yang ditampilkan di halaman Galeri Komunitas.
                    </p>
                </div>
                <GalleryDialog onSuccess={fetchItems} />
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden group">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-4">
                                <p className="text-sm text-foreground line-clamp-2 min-h-[40px] mb-4">
                                    {item.description}
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <GalleryDialog
                                        item={item}
                                        onSuccess={fetchItems}
                                        trigger={
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        }
                                    />

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus foto dari galeri secara permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {items.length === 0 && (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg bg-accent/10">
                            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 text-muted-foreground">
                                <Plus className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold">Belum ada foto</h3>
                            <p className="text-muted-foreground max-w-sm mt-1 mb-4">
                                Mulai dengan menambahkan foto pertama ke galeri komunitas.
                            </p>
                            <GalleryDialog onSuccess={fetchItems} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
