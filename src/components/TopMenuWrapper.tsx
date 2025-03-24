import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import TopMenu from './TopMenu';

export default async function TopMenuWrapper() {
  const session = await getServerSession(authOptions);

  return <TopMenu session={session} />;
}