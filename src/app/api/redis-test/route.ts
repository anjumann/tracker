import { NextResponse } from 'next/server';
import { testRedisConnection } from '@/lib/redis-test';

export async function GET() {
  try {
    const isConnected = await testRedisConnection();
    
    if (isConnected) {
      return NextResponse.json({ status: 'success', message: 'Redis connection test successful' });
    } else {
      return NextResponse.json({ status: 'error', message: 'Redis connection test failed' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Redis connection test failed', error: String(error) }, { status: 500 });
  }
} 