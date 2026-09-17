import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { LoginForm } from "@/components/login-form";
import { VinistoLogo } from "@/components/vinisto-logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "@/lib/auth/server";

export const metadata = { title: "Přihlášení" };

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="mb-1 text-[var(--vinisto-green)]">
              <VinistoLogo height={40} />
            </div>
            <CardTitle className="text-lg">Portál prodejce</CardTitle>
            <CardDescription>
              Přihlaste se účtem prodejce vinisto. Přístup mají jen účty napojené na prodejce.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Suspense>
              <LoginForm />
            </Suspense>
            <div className="flex justify-between text-xs text-muted-foreground">
              <Link href="/registrace" className="hover:underline">
                Registrace prodejce
              </Link>
              <Link href="/kontakt" className="hover:underline">
                Kontakt
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <AppFooter />
    </div>
  );
}
