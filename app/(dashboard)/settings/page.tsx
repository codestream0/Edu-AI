"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Monitor,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Sun,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { api } from "@/lib/api";
import { useAppSelector } from "@/lib/redux/hooks";

type Section = "profile" | "appearance" | "security" | "notifications";

const sections = [
  {
    id: "profile" as const,
    label: "Profile",
    description: "Personal information",
    icon: UserRound,
  },
  {
    id: "appearance" as const,
    label: "Appearance",
    description: "Theme preferences",
    icon: Palette,
  },
  {
    id: "security" as const,
    label: "Security",
    description: "Password and account security",
    icon: ShieldCheck,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    description: "Study and product updates",
    icon: Bell,
  },
];

export default function SettingsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [active, setActive] = useState<Section>("profile");
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [notifications, setNotifications] = useState({
    studyReminders: true,
    quizResults: true,
    productUpdates: false,
  });
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    setFullName(user?.fullName ?? "");
    setEmail(user?.email ?? "");
  }, [user?.fullName, user?.email]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingProfile(true);
    setProfileMessage("");
    setProfileError("");
    try {
      const response = await api.patch("/auth/profile", {
        fullName: fullName.trim(),
      });
      setFullName(response.data?.user?.fullName || fullName.trim());
      setProfileMessage(
        response.data?.message || "Profile updated successfully.",
      );
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setProfileError(
        message ||
          "Could not update your profile. Check that PATCH /auth/profile is implemented in your backend.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("Your new password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not match.");
      return;
    }
    setChangingPassword(true);
    try {
      await api.patch("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password changed successfully.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;
      setPasswordError(
        message ||
          "Could not change your password. Check that PATCH /auth/change-password is implemented in your backend.",
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const saveNotifications = async () => {
    setSavingNotifications(true);
    setNotificationMessage("");
    try {
      await api.patch("/auth/preferences", { notifications });
      setNotificationMessage("Notification preferences saved.");
    } catch (error) {
      console.error("Could not save notification preferences:", error);
      setNotificationMessage(
        "Saving preferences requires a backend endpoint at PATCH /auth/preferences.",
      );
    } finally {
      setSavingNotifications(false);
    }
  };

  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "S";
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2F80ED] focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950";
  const labelClass = "text-sm font-medium text-slate-700 dark:text-slate-200";
  const cardClass =
    "rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-950";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account and personalize your EDU AI experience.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="h-fit rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = active === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActive(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${selected ? "bg-[#EAF3FF] text-[#2F80ED] dark:bg-blue-950/50 dark:text-blue-300" : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">
                    {section.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {section.description}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
              </button>
            );
          })}
        </nav>

        <div className="min-w-0 space-y-6">
          {active === "profile" && (
            <section className={cardClass}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Update the name associated with your EDU AI account.
              </p>
              <div className="my-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2F80ED] text-xl font-bold text-white">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {fullName || "Student"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    EDU AI student account
                  </p>
                </div>
              </div>
              <form onSubmit={saveProfile} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="settings-name" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="settings-name"
                    className={inputClass}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    minLength={2}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="settings-email" className={labelClass}>
                    Email address
                  </label>
                  <input
                    id="settings-email"
                    className={`${inputClass} cursor-not-allowed bg-slate-50 dark:bg-slate-900`}
                    type="email"
                    value={email}
                    readOnly
                  />
                  <p className="text-xs text-slate-500">
                    Changing your email should use a separate verification flow.
                  </p>
                </div>
                {profileError && (
                  <p role="alert" className="flex gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {profileError}
                  </p>
                )}
                {profileMessage && (
                  <p
                    role="status"
                    className="flex gap-2 text-sm text-emerald-600"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    {profileMessage}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingProfile || !fullName.trim()}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingProfile ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {savingProfile ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {active === "appearance" && (
            <section className={cardClass}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Appearance
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose how EDU AI looks on this device.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    value: "light",
                    label: "Light",
                    detail: "Bright interface",
                    icon: Sun,
                  },
                  {
                    value: "dark",
                    label: "Dark",
                    detail: "Low-light interface",
                    icon: Moon,
                  },
                  {
                    value: "system",
                    label: "System",
                    detail: "Follow device",
                    icon: Monitor,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  const selected = theme === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTheme(option.value)}
                      className={`rounded-xl border p-4 text-left transition ${selected ? "border-[#2F80ED] bg-[#EAF3FF] dark:bg-blue-950/40" : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"}`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon
                          className={`h-5 w-5 ${selected ? "text-[#2F80ED]" : "text-slate-500"}`}
                        />
                        {selected && (
                          <Check className="h-4 w-4 text-[#2F80ED]" />
                        )}
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                        {option.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {option.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Current appearance: {resolvedTheme || theme || "system"}.
              </p>
            </section>
          )}

          {active === "security" && (
            <section className={cardClass}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Account security
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Use a strong password you do not reuse on other sites.
              </p>
              <form onSubmit={changePassword} className="mt-6 space-y-5">
                {[
                  {
                    id: "current-password",
                    label: "Current password",
                    value: currentPassword,
                    set: setCurrentPassword,
                    autoComplete: "current-password",
                  },
                  {
                    id: "new-password",
                    label: "New password",
                    value: newPassword,
                    set: setNewPassword,
                    autoComplete: "new-password",
                  },
                  {
                    id: "confirm-password",
                    label: "Confirm new password",
                    value: confirmPassword,
                    set: setConfirmPassword,
                    autoComplete: "new-password",
                  },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className={labelClass}>
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        id={field.id}
                        className={`${inputClass} pr-12`}
                        type={showPasswords ? "text" : "password"}
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                        required
                        autoComplete={field.autoComplete}
                        minLength={
                          field.id === "current-password" ? undefined : 8
                        }
                      />
                      {field.id === "current-password" && (
                        <button
                          type="button"
                          onClick={() => setShowPasswords((v) => !v)}
                          aria-label={
                            showPasswords ? "Hide passwords" : "Show passwords"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500"
                        >
                          {showPasswords ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {passwordError && (
                  <p role="alert" className="flex gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {passwordError}
                  </p>
                )}
                {passwordMessage && (
                  <p
                    role="status"
                    className="flex gap-2 text-sm text-emerald-600"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    {passwordMessage}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      changingPassword ||
                      !currentPassword ||
                      !newPassword ||
                      !confirmPassword
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {changingPassword ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <LockKeyhole className="h-4 w-4" />
                    )}
                    {changingPassword ? "Updating..." : "Change password"}
                  </button>
                </div>
              </form>
              <p className="mt-4 text-xs text-slate-500">
                Requires a backend endpoint at PATCH /auth/change-password.
              </p>
            </section>
          )}

          {active === "notifications" && (
            <section className={cardClass}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Notifications
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Choose which updates you want EDU AI to send.
              </p>
              <div className="mt-6 space-y-5">
                {[
                  {
                    id: "studyReminders" as const,
                    title: "Study reminders",
                    description: "Reminders to return to your study plan.",
                  },
                  {
                    id: "quizResults" as const,
                    title: "Quiz results",
                    description: "Updates when quiz results are available.",
                  },
                  {
                    id: "productUpdates" as const,
                    title: "Product updates",
                    description: "New features and important announcements.",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-start justify-between gap-4"
                  >
                    <span>
                      <span className="block text-sm font-medium text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">
                        {item.description}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={notifications[item.id]}
                      onChange={(e) =>
                        setNotifications((previous) => ({
                          ...previous,
                          [item.id]: e.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 accent-[#2F80ED]"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className="text-xs text-slate-500">
                  {notificationMessage}
                </p>
                <button
                  type="button"
                  onClick={() => void saveNotifications()}
                  disabled={savingNotifications}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2F80ED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingNotifications ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {savingNotifications ? "Saving..." : "Save preferences"}
                </button>
              </div>
            </section>
          )}

          <aside className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
            <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-[#2F80ED]" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Need help with your settings?
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Visit Help & Support for guidance with your EDU AI account.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
