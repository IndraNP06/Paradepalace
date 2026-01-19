"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Plus, Upload, X } from "lucide-react"
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Schema
const formSchema = z.object({
    description: z.string().min(1, "Deskripsi harus diisi"),
    // Image is handled separately via state since file input logic varies
})

interface GalleryItem {
    id: string
    description: string
    imageUrl: string
}

interface GalleryDialogProps {
    item?: GalleryItem
    trigger?: React.ReactNode
    onSuccess?: () => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function GalleryDialog({ item, trigger, onSuccess, open: constrainedOpen, onOpenChange: setConstrainedOpen }: GalleryDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = constrainedOpen !== undefined
    const open = isControlled ? constrainedOpen : internalOpen

    const setOpen = (value: boolean) => {
        if (isControlled) {
            setConstrainedOpen?.(value)
        } else {
            setInternalOpen(value)
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    // Support multiple images
    const [previews, setPreviews] = useState<string[]>(item?.imageUrl ? [item.imageUrl] : [])
    const [imageFiles, setImageFiles] = useState<File[]>([])

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: item?.description || "",
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const newFiles = Array.from(files)
            setImageFiles(prev => [...prev, ...newFiles])

            newFiles.forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImage = (index: number) => {
        setPreviews(prev => prev.filter((_, i) => i !== index))
        setImageFiles(prev => prev.filter((_, i) => i !== index))
    }

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const timestamp = Math.round((new Date).getTime() / 1000);
        const paramsToSign = {
            timestamp: timestamp,
            upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        };

        const signatureRes = await fetch('/api/sign-cloudinary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paramsToSign }),
        });

        const { signature } = await signatureRes.json();

        if (!signature) throw new Error("Failed to generate signature");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error.message);
        return uploadData.secure_url;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!item && imageFiles.length === 0) {
            toast({
                variant: "destructive",
                title: "Gambar diperlukan",
                description: "Silakan unggah minimal satu gambar.",
            })
            return
        }

        try {
            setIsLoading(true)

            if (item) {
                // UPDATE MODE (Likely single item context if editing from list, 
                // but if user added more files we could potentially create new docs or just update one.
                // Assuming "Edit" keeps it 1:1 for now, or if multiple added, only first is used to update.)

                let url = item.imageUrl
                if (imageFiles.length > 0) {
                    // Upload first new file to replace existing
                    url = await uploadToCloudinary(imageFiles[0])
                }

                await updateDoc(doc(db, "gallery_items", item.id), {
                    description: values.description,
                    imageUrl: url,
                    updatedAt: serverTimestamp(),
                })
                toast({ title: "Berhasil", description: "Foto berhasil diperbarui." })

            } else {
                // CREATE MODE (Multiple support)
                const uploadPromises = imageFiles.map(async (file) => {
                    const url = await uploadToCloudinary(file)
                    return addDoc(collection(db, "gallery_items"), {
                        description: values.description,
                        imageUrl: url,
                        createdAt: serverTimestamp(),
                    })
                })

                await Promise.all(uploadPromises)
                toast({ title: "Berhasil", description: `${imageFiles.length} Foto berhasil ditambahkan.` })
            }

            setOpen(false)
            form.reset()
            setPreviews([])
            setImageFiles([])
            onSuccess?.()
        } catch (error: any) {
            console.error(error)
            toast({
                variant: "destructive",
                title: "Gagal",
                description: error.message || "Terjadi kesalahan saat menyimpan data.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Foto
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{item ? "Edit Foto" : "Tambah Foto Baru"}</DialogTitle>
                    <DialogDescription>
                        {item ? "Perbarui deskripsi atau ganti foto." : "Unggah satu atau banyak foto sekaligus."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <FormLabel>Foto ({previews.length})</FormLabel>
                            <div className="grid grid-cols-2 gap-4">
                                {previews.map((src, index) => (
                                    <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden group border bg-muted">
                                        <Image
                                            src={src}
                                            alt={`Preview ${index}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                <label className="flex flex-col items-center justify-center gap-2 cursor-pointer w-full aspect-video border-2 border-dashed border-input rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">
                                    <Upload className="h-6 w-6" />
                                    <span className="text-xs font-medium">Tambah Foto</span>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        multiple
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi / Judul (Untuk Semua)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Contoh: Dokumentasi Event..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {item ? "Simpan Perubahan" : `Upload ${imageFiles.length > 0 ? imageFiles.length : ''} Foto`}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
