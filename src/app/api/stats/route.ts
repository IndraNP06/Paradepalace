import { NextResponse } from 'next/server';

export async function GET() {
    const inviteCode = 'MATaddGGZe';

    try {
        // Fetch Invite Info (public API, no token needed)
        const res = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) throw new Error('Failed to fetch invite info');
        const data = await await res.json();

        return NextResponse.json({
            totalMembers: data.approximate_member_count || 0,
            onlineMembers: data.approximate_presence_count || 0,
            botCount: 8 // Static value for bots
        });

    } catch (error) {
        console.error('Discord API Error:', error);
        return NextResponse.json({
            totalMembers: 0,
            onlineMembers: 0,
            activeChannels: 0
        });
    }
}
