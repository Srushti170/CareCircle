import { cn } from "@/lib/utils";

type IconProps = {
  name: string;
  className?: string;
};

function Path({ name }: { name: string }) {
  switch (name) {
    case "account_circle":
      return (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </>
      );
    case "add":
      return <path d="M12 5v14M5 12h14" />;
    case "add_circle":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </>
      );
    case "arrow_forward":
      return <path d="M5 12h14M13 6l6 6-6 6" />;
    case "arrow_back":
      return <path d="M19 12H5M11 6l-6 6 6 6" />;
    case "calendar_today":
    case "event":
      return (
        <>
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M8 3v4M16 3v4M4 9h16" />
        </>
      );
    case "check_circle":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12 2.3 2.5 4.7-5.2" />
        </>
      );
    case "checklist":
      return (
        <>
          <rect x="5" y="5" width="3" height="3" rx="0.8" />
          <rect x="5" y="10.5" width="3" height="3" rx="0.8" />
          <rect x="5" y="16" width="3" height="3" rx="0.8" />
          <path d="M10.5 6.5H19M10.5 12H19M10.5 17.5H19" />
        </>
      );
    case "dark_mode":
      return <path d="M16.5 3.5A7.8 7.8 0 1 0 20 16 8.5 8.5 0 0 1 16.5 3.5Z" />;
    case "dashboard":
      return (
        <>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="5" rx="1.5" />
          <rect x="13" y="11" width="7" height="9" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
        </>
      );
    case "description":
    case "picture_as_pdf":
      return (
        <>
          <path d="M8 3h6l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5" />
        </>
      );
    case "download":
        return <path d="M12 4v10M8 10l4 4 4-4M5 19h14" />;
    case "emergency":
      return (
        <>
          <path d="M12 4 3 20h18L12 4Z" />
          <path d="M12 9v5M12 17h.01" />
        </>
      );
    case "favorite":
      return <path d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z" />;
    case "forum":
      return (
        <>
          <path d="M4 6h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-4 3v-3H4a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z" />
        </>
      );
    case "groups":
      return (
        <>
          <circle cx="9" cy="9" r="2.5" />
          <circle cx="16.5" cy="10" r="2" />
          <path d="M4.5 18a4.5 4.5 0 0 1 9 0M14 18a3.5 3.5 0 0 1 6 0" />
        </>
      );
    case "history":
      return (
        <>
          <path d="M4 12a8 8 0 1 0 2.3-5.7" />
          <path d="M4 4v4h4M12 8v5l3 2" />
        </>
      );
    case "home":
      return <path d="M3 11.5 12 4l9 7.5M6.5 10.5V20h11v-9.5" />;
    case "image":
      return (
        <>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="m7 17 3.5-3.5L13 16l2.5-2.5L19 17" />
        </>
      );
    case "language":
    case "translate":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </>
      );
    case "light_mode":
    case "wb_sunny":
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
        </>
      );
    case "location_on":
      return (
        <>
          <path d="M12 20s6-5.6 6-10a6 6 0 1 0-12 0c0 4.4 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.3" />
        </>
      );
    case "medical_services":
      return (
        <>
          <rect x="5" y="6" width="14" height="12" rx="2.5" />
          <path d="M12 9v6M9 12h6M9 6V4M15 6V4" />
        </>
      );
    case "medication":
    case "pill":
      return (
        <>
          <path d="M8.5 7.5a3.5 3.5 0 1 1 5 5l-4 4a3.5 3.5 0 1 1-5-5l4-4Z" />
          <path d="m9.5 8.5 6 6" />
        </>
      );
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "monitor_heart":
      return <path d="M3 12h4l2-3 3 7 2-4h7M7 5h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />;
    case "more_vert":
      return (
        <>
          <circle cx="12" cy="6" r="1.2" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="12" cy="18" r="1.2" />
        </>
      );
    case "person":
      return (
        <>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 19a6 6 0 0 1 12 0" />
        </>
      );
    case "person_add":
      return (
        <>
          <circle cx="10" cy="8" r="3" />
          <path d="M4.5 19a5.5 5.5 0 0 1 11 0M18 8v6M15 11h6" />
        </>
      );
    case "play_circle":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8 6 4-6 4Z" />
        </>
      );
    case "prescriptions":
      return (
        <>
          <path d="M8 4h6a4 4 0 1 1 0 8H8Z" />
          <path d="M8 12v8M8 16h8" />
        </>
      );
    case "restaurant":
      return <path d="M7 4v8M5 4v4a2 2 0 0 0 4 0V4M12 4v16M16 4c1.7 0 3 1.8 3 4s-1.3 4-3 4" />;
    case "rocket_launch":
      return <path d="M9 15c-2 1-3 3-3 5 2 0 4-1 5-3m1-9 6-6c1 3 0 8-3 11s-8 4-11 3l6-6Zm0 0 4 4" />;
    case "save":
      return (
        <>
          <path d="M5 4h11l3 3v13H5Z" />
          <path d="M8 4v5h7V4M8 20v-6h8v6" />
        </>
      );
    case "send":
      return <path d="M3 11.5 20 4l-5.5 16-3.2-5.3L3 11.5Zm8.3 3.2L20 4" />;
    case "sentiment_satisfied":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 14a5 5 0 0 0 7 0M9 10h.01M15 10h.01" />
        </>
      );
    case "settings":
      return <path d="M12 3.5l1.6 1.1 2-.3 1 1.8 1.9.8v2.2l1.4 1.4-1.4 1.4v2.2l-1.9.8-1 1.8-2-.3L12 20.5l-1.6-1.1-2 .3-1-1.8-1.9-.8v-2.2L4.1 12l1.4-1.4V8.4l1.9-.8 1-1.8 2 .3L12 3.5Zm0 5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />;
    case "stethoscope":
      return <path d="M8 4v6a4 4 0 0 0 8 0V4M6 4h4M14 4h4M16 14v1.5a2.5 2.5 0 1 0 5 0V13" />;
    case "sync":
      return <path d="M20 6v5h-5M4 18v-5h5M6.5 9A6 6 0 0 1 17 6l3 5M17.5 15A6 6 0 0 1 7 18l-3-5" />;
    case "upload_file":
      return (
        <>
          <path d="M8 3h6l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M12 17V9M9 12l3-3 3 3" />
        </>
      );
    case "vaccines":
      return <path d="m16 5 3 3M8 16l8-8 3 3-8 8H8v-3Zm7-9 2-2" />;
    case "visibility":
      return <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Zm9.5-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />;
    case "water_drop":
      return <path d="M12 4s5 5.5 5 9a5 5 0 1 1-10 0c0-3.5 5-9 5-9Z" />;
    case "wb_twilight":
      return <path d="M4 15h16M7 18h10M12 5v5M8 9l4-4 4 4" />;
    default:
      return (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M9 12h6" />
        </>
      );
  }
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width="1em"
      height="1em"
      className={cn("inline-block h-[1em] w-[1em] shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <Path name={name} />
    </svg>
  );
}
