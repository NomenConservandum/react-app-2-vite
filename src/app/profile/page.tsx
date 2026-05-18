'use client';
import { withAuth } from '@/shared/hooks/useAuth';

function ProfilePage() {
  return <h1>Profile Page (Protected)</h1>;
}

export default withAuth(ProfilePage);