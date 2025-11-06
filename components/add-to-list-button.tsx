"use client";
import AddToListModal from "./add-to-list-modal";

interface AddToListButtonProps {
  id: number;
  type: "MOVIE" | "TVSHOW";
  userId: string;
  onSuccess: () => void;
  onError: () => void;
  alt?: boolean;
}

export default function AddToListButton({
  userId,
  id,
  type,
  onSuccess,
  onError,
  alt = false,
}: AddToListButtonProps) {
  if (alt) {
    return (
      <>
        <AddToListModal
          alt={false}
          userId={userId}
          id={id}
          type={type}
          onSuccess={onSuccess}
          onError={onError}
        />
      </>
    );
  }

  return (
    <>
      <AddToListModal
        alt={true}
        userId={userId}
        id={id}
        type={type}
        onSuccess={onSuccess}
        onError={onError}
      />
    </>
  );
}
