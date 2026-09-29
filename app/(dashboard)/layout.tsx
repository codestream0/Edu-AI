import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AuthGuard } from "@/lib/redux/features/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
