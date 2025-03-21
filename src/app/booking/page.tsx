import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import getUserProfile from '@/libs/getUserProfile'
import BookingClient from './booking-client'

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if(!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  
  return <BookingClient profile={profile} />
}