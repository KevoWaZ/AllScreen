import * as Avatar from "@radix-ui/react-avatar";

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    bio: string;
    image: string;
  };
  counts: {
    moviesWatchCount: number;
    TVSHOWWatchCount: number;
    moviesWatchListsCount: number;
    TVSHOWWatchListsCount: number;
  };
}

export function ProfileHeader({ user, counts }: ProfileHeaderProps) {
  return (
    <div className="bg-[#2C2C2C] rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="relative group cursor-pointer">
          <Avatar.Root className="inline-flex h-24 w-24 md:h-32 md:w-32 select-none items-center justify-center overflow-hidden rounded-full bg-[#4A4A4A]">
            <Avatar.Image
              className="h-full w-full rounded-full object-cover"
              src={user.image || "/placeholder.svg"}
              alt={user.name}
            />
            <Avatar.Fallback className="text-[#BDBDBD] text-2xl font-medium flex h-full w-full items-center justify-center bg-[#4A4A4A] rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-[#BDBDBD] text-sm md:text-base leading-relaxed max-w-md">
                {user.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">
                  {counts.moviesWatchCount}
                </div>
                <div className="text-[#BDBDBD] text-sm">Films vus</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">
                  {counts.TVSHOWWatchCount}
                </div>
                <div className="text-[#BDBDBD] text-sm">Séries vues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
