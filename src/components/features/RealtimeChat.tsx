"use client";

import { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, orderBy, limit, addDoc, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    createdAt: Timestamp | null;
    uid: string;
    displayName: string;
    photoURL: string | null;
}

export function RealtimeChat() {
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!db || !db.app) { // Check if Firestore is initialized
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedMessages: Message[] = [];
            querySnapshot.forEach((doc) => {
                fetchedMessages.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(fetchedMessages);
            setLoading(false);

            // Auto scroll to bottom
            setTimeout(() => {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }, (error) => {
            console.error("Error fetching messages:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim() || !user) return;

        try {
            await addDoc(collection(db, 'messages'), {
                text: newMessage,
                createdAt: serverTimestamp(),
                uid: user.uid,
                displayName: user.displayName || 'User',
                photoURL: user.photoURL,
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    return (
        <Card className="w-full h-[500px] flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Live Community Chat
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                    {loading ? (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {!db || !db.app ? (
                                <div className="text-center text-muted-foreground p-4">
                                    Firestore is not active in this environment.
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center text-muted-foreground py-10">
                                    No messages yet. Be the first to say hi!
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-3 ${user?.uid === msg.uid ? 'flex-row-reverse' : ''}`}>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={msg.photoURL || undefined} />
                                            <AvatarFallback>{msg.displayName?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <div className={`flex flex-col max-w-[80%] ${user?.uid === msg.uid ? 'items-end' : ''}`}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-medium text-muted-foreground">{msg.displayName}</span>
                                            </div>
                                            <div className={`px-3 py-2 rounded-lg text-sm ${user?.uid === msg.uid
                                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                                : 'bg-muted rounded-tl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={scrollRef} />
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t">
                {user ? (
                    <form onSubmit={sendMessage} className="flex w-full gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                ) : (
                    <div className="w-full text-center text-sm py-2 bg-muted/50 rounded-md">
                        Please sign in to chat
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
