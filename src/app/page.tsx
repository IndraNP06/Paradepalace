import { serverStats } from '@/lib/data';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HomePage } from '@/components/home-page';

export const dynamic = 'force-dynamic'; // Ensure fresh data on every request if needed, or use revalidate

async function getStats() {
  try {
    // We can call independent API or logic here if not using internal API route
    // But since we have /api/stats, we can call the logic directly or fetch the URL.
    // Calling internal API URL from server component is bad practice (extra round trip).
    // BETTER: Duplicate logic or simple fetch if really needed. 
    // Given the previous task was about /api/stats, I will use fetch with full URL if defined, 
    // OR BETTER: Use the same logic as the API if possible, BUT the API calls Discord.
    // Let's keep it simple and safe: Re-implement the Discord logic or just use the default serverStats as fallback.

    // For now, let's try to fetch the Discord API directly here on the server side 
    // to match the client-side behavior, but efficiently.
    const inviteCode = 'MATaddGGZe';
    const res = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return {
        totalMembers: serverStats.find(s => s.label === "Total Anggota")?.value || "0",
        onlineMembers: serverStats.find(s => s.label === "Online Sekarang")?.value || "0",
        offlineMembers: serverStats.find(s => s.label === "Anggota Offline")?.value || "0"
      };
    }

    const data = await res.json();

    // Return a simple object with just the numbers
    return {
      totalMembers: (data.approximate_member_count || 0).toString(),
      onlineMembers: (data.approximate_presence_count || 0).toString(),
      offlineMembers: ((data.approximate_member_count || 0) - (data.approximate_presence_count || 0)).toString()
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return default values from the static file if fetch fails
    const defaults = {
      totalMembers: serverStats.find(s => s.label === "Total Anggota")?.value || "0",
      onlineMembers: serverStats.find(s => s.label === "Online Sekarang")?.value || "0",
      offlineMembers: serverStats.find(s => s.label === "Anggota Offline")?.value || "0"
    };
    return defaults;
  }
}

async function getTeam() {
  try {
    const querySnapshot = await getDocs(collection(db, "team_members"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    data.sort((a: any, b: any) => {
      const dateA = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt || 0).getTime();
      const dateB = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt || 0).getTime();
      return dateA - dateB;
    });

    // We need to serialize the data because Firestore returns complex objects (TimeStamps) 
    // that can't be passed directly to Client Components.
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching team:", error);
    return [];
  }
}

export default async function Page() {
  const statsData = await getStats();
  const teamData = await getTeam();

  return <HomePage stats={statsData} team={teamData} />;
}
