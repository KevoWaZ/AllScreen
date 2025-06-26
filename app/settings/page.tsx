"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiLogOut,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Loading from "../loading";
import CSVDownload from "@/components/profile/watchedMoviesCSV";

const ProfilePage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({
    type: "",
    text: "",
  });
  const [emailMessage, setEmailMessage] = useState({ type: "", text: "" });
  const [isCredential, setIsCrendential] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session, isPending, error } = authClient.useSession();
  console.log(session);

  const router = useRouter();

  const getAccount = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/get-user");
      const data = await res.json();
      console.log("API: ", data);
      if (!data) console.log("No accounts");
      const typeVerif = data?.provider === "credential";
      console.log(typeVerif);
      setIsCrendential(typeVerif);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  if (isPending || loading) {
    return <Loading />;
  }

  if (error || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className=" bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full">
          <p className=" text-white mb-4">
            Session expirée ou erreur de connexion
          </p>
          <button
            onClick={() => router.push("/auth/signin")}
            cursor-pointer
            className="w-full  bg-red-700 hover:bg-red-800 text-white cursor-pointer py-2 px-4 rounded-lg transition-colors"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const changeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) {
      setEmailMessage({ type: "error", text: "Veuillez entrer un email" });
      return;
    }

    setIsChangingEmail(true);
    setEmailMessage({ type: "", text: "" });

    try {
      await authClient.changeEmail({
        newEmail: newEmail,
      });
      setEmailMessage({
        type: "success",
        text: "Email mis à jour avec succès. Vérifiez votre boîte de réception pour confirmer.",
      });
      setNewEmail("");
    } catch (error) {
      setEmailMessage({
        type: "error",
        text: `Erreur lors du changement d'email: ${error}`,
      });
    } finally {
      setIsChangingEmail(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMessage({
        type: "error",
        text: "Veuillez remplir tous les champs",
      });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "Le mot de passe doit contenir au moins 6 caractères",
      });
      return;
    }

    setIsChangingPassword(true);
    setPasswordMessage({ type: "", text: "" });

    try {
      await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });
      setPasswordMessage({
        type: "success",
        text: "Mot de passe mis à jour avec succès",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: `Erreur lors du changement de mot de passe: ${error}`,
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#121212]">
      <div className="border border-[#2C2C2C]  bg-[#121212] shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2  border-red-700">
            {session.user?.image ? (
              <Image
                src={session.user.image || "/placeholder.svg"}
                alt={session.user.name || "Profil"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full  bg-gray-600 flex items-center justify-center">
                <FiUser className="text-3xl  text-gray-400" />
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold  text-white">
            {session.user?.name || "Utilisateur"}
          </h1>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center  text-gray-300">
            <FiMail className="mr-3  text-red-500" />
            <span>{session.user?.email}</span>
          </div>
          {session.user?.createdAt && (
            <div className="flex items-center  text-gray-300">
              <FiCalendar className="mr-3  text-red-500" />
              <span>Membre depuis le {formatDate(session.user.createdAt)}</span>
            </div>
          )}
        </div>

        {isCredential && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold  text-white mb-4">
                Changer d&apos;email
              </h2>
              <form onSubmit={changeEmail} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                  >
                    Nouvel email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Nouvel email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F]"
                  />
                </div>

                {emailMessage.text && (
                  <div
                    className={`flex items-center ${
                      emailMessage.type === "error"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {emailMessage.type === "error" ? (
                      <FiAlertCircle className="mr-2" />
                    ) : (
                      <FiCheck className="mr-2" />
                    )}
                    <span>{emailMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isChangingEmail}
                  className="w-full  bg-red-700 hover:bg-red-800 text-white cursor-pointer py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isChangingEmail
                    ? "Changement en cours..."
                    : "Changer d'email"}
                </button>
              </form>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold  text-white mb-4">
                Changer de mot de passe
              </h2>
              <form onSubmit={changePassword} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="current_password"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                  >
                    Mot de passe actuel
                  </label>
                  <input
                    id="current_password"
                    type="password"
                    placeholder="Mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="new_password"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                  >
                    Nouveau mot de passe
                  </label>
                  <input
                    id="new_password"
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                  />
                </div>

                {passwordMessage.text && (
                  <div
                    className={`flex items-center ${
                      passwordMessage.type === "error"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {passwordMessage.type === "error" ? (
                      <FiAlertCircle className="mr-2" />
                    ) : (
                      <FiCheck className="mr-2" />
                    )}
                    <span>{passwordMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full  bg-red-700 hover:bg-red-800 text-white cursor-pointer py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isChangingPassword
                    ? "Changement en cours..."
                    : "Changer de mot de passe"}
                </button>
              </form>
            </div>
          </>
        )}

        <div className="pt-4 border-t  border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <CSVDownload userId={session.user.id} type="watched" />
              <CSVDownload userId={session.user.id} type="watchlists" />
            </div>
            <div className="text-sm  text-gray-400">
              {session.user?.emailVerified ? (
                <span className="text-green-500">Email vérifié</span>
              ) : (
                <span className="text-red-500">Email non vérifié</span>
              )}
            </div>

            <button
              onClick={async () =>
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/auth/signin");
                    },
                  },
                })
              }
              className="flex items-center  bg-red-700 hover:bg-red-800 text-white cursor-pointer py-2 px-4 rounded-lg transition-colors"
            >
              <FiLogOut className="mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
