// Registrace nového prodejce — veřejný průvodce, vše přes server actions.

import { RegisterWizard } from "@/components/register/register-wizard";

export const metadata = { title: "Registrace prodejce" };

export default function RegistracePage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Registrace prodejce</h1>
      <RegisterWizard />
    </div>
  );
}
