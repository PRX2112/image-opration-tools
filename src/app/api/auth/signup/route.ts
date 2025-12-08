import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { users, userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Validate input
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        // Create user
        const [newUser] = await db
            .insert(users)
            .values({
                name,
                email,
                password, // Already hashed on client
                emailVerified: null,
                image: null,
            })
            .returning();

        // Create user usage record
        await db.insert(userUsage).values({
            userId: newUser.id,
            downloadsThisMonth: 0,
            storageUsed: 0,
            subscriptionTier: 'free',
        });

        return NextResponse.json(
            { message: 'User created successfully', userId: newUser.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
