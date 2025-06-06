import { ProfileHeader } from "@/components/profile/profile-header";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div>
      <div className="min-h-screen bg-[#121212] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <ProfileHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
