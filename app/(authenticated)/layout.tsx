"use client";
import type React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { NextAuthProvider } from "@/components/next-auth-provider";
// import { useState, useEffect } from "react";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [session, setSession] = useState(null);

  //   useEffect(() => {
  //     const fetchSession = async () => {
  //       const response = await fetch("/api/session");
  //       const data = await response.json();
  //       setSession(data);
  //     };
  //     fetchSession();
  //   }, []);
  const session = await getServerSession();

  if (!session) {
    redirect("/dashboard");
  }

  return (
    <NextAuthProvider session={session}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </NextAuthProvider>
  );
}
