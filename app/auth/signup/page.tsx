"use client";

import type React from "react";

import { useState } from "react";
import Link from "@/components/utils/Link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Form from "next/form";
import { IoClose } from "react-icons/io5";
import { BiLoader } from "react-icons/bi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  // const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center  bg-[#121212] p-4">
      <div className="w-full max-w-md rounded-xl border  border-[#2C2C2C]  bg-[#121212] p-6 shadow-lg">
        <div className="mb-6">
          <h1 className="text-lg md:text-xl font-bold  text-white font-inter">
            Inscription
          </h1>
          <p className="text-xs md:text-sm  text-[#BDBDBD] font-inter mt-1">
            Entrez vos informations pour créer un compte
          </p>
        </div>

        <div className="space-y-4">
          <Form
            action={async () => {
              await authClient.signUp.email({
                email,
                password,
                name: username,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/settings",
                fetchOptions: {
                  onResponse: () => {
                    setLoading(false);
                  },

                  onRequest: () => {
                    setLoading(true);
                  },

                  onSuccess: async () => {
                    router.push("/settings");
                  },
                },
              });
            }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white ] placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  autoComplete="new-password"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white  placeholder:text-[#4A4A4A] focus:border-[#D32F2F] focus:outline-hidden focus:ring-1 focus:ring-[#D32F2F] font-inter"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                >
                  Image de profil (optionnel)
                </label>
                <div className="flex items-end gap-4">
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-xs overflow-hidden">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Aperçu du profil"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 w-full">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-md border  border-[#4A4A4A]  bg-[#2C2C2C] py-2 px-3  text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium  file:bg-[#2C2C2C] file:text-white  hover:file:bg-[#3C3C3C]"
                    />
                    {imagePreview && (
                      <IoClose
                        className="cursor-pointer  text-white  hover:text-[#FF5252]"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium  text-[#BDBDBD] font-inter"
                  >
                    Gender
                  </label>
                  <Select.Root value={gender} onValueChange={setGender}>
                    <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 bg-[#2C2C2C] text-white rounded-lg border border-[#4A4A4A] hover:border-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF5252] focus:ring-offset-2 focus:ring-offset-[#121212] min-w-[160px]">
                      <Select.Value>{gender}</Select.Value>
                      <Select.Icon>
                        <BiChevronDown className="w-4 h-4" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="overflow-hidden bg-[#2C2C2C] rounded-lg border border-[#4A4A4A] shadow-lg">
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                          <BiChevronUp />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="p-1">
                          <Select.Item
                            value="MALE"
                            className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                          >
                            <Select.ItemText>MALE</Select.ItemText>
                          </Select.Item>
                          <Select.Item
                            value="FEMALE"
                            className="relative flex items-center px-8 py-2 text-white rounded cursor-pointer hover:bg-[#4A4A4A] focus:bg-[#4A4A4A] focus:outline-none data-[state=checked]:bg-[#D32F2F] data-[state=checked]:text-white"
                          >
                            <Select.ItemText>FEMALE</Select.ItemText>
                          </Select.Item>
                        </Select.Viewport>
                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-[#2C2C2C] text-[#BDBDBD] cursor-default">
                          <BiChevronDown />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              </div> */}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center cursor-pointer rounded-md  bg-[#B71C1C] py-2 px-4 text-sm font-medium text-white  hover:bg-[#D32F2F] focus:outline-hidden focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 transition-colors font-inter disabled:opacity-70"
              >
                {loading ? (
                  <BiLoader size={16} className="animate-spin" />
                ) : (
                  "Créer un compte"
                )}
              </button>
            </div>
          </Form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm  text-[#BDBDBD] font-inter">
            Déjà un compte?{" "}
            <Link
              href="/auth/signin"
              className="font-medium  text-[#FF5252]  hover:underline font-inter"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
