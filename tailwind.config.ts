import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-soft": "var(--primary-soft)",
        "primary-deep": "var(--primary-deep)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "surface-muted": "var(--surface-muted)",
        line: "var(--line)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        success: "var(--success)",
        "success-bg": "var(--success-bg)",
        warning: "var(--warning)",
        "warning-bg": "var(--warning-bg)",
        danger: "var(--danger)",
        "danger-bg": "var(--danger-bg)"
      },
      boxShadow: {
        soft: "0 14px 40px -18px rgba(39, 68, 55, 0.22)",
        card: "0 8px 28px -18px rgba(39, 68, 55, 0.18)"
      },
      borderRadius: {
        shell: "28px",
        card: "24px"
      },
      fontSize: {
        display: ["3.1rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        hero: ["2.45rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        h1: ["2.15rem", { lineHeight: "1.14", letterSpacing: "-0.03em" }],
        h2: ["1.55rem", { lineHeight: "1.22", letterSpacing: "-0.02em" }],
        h3: ["1.16rem", { lineHeight: "1.32", letterSpacing: "-0.01em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        label: ["0.95rem", { lineHeight: "1.45" }]
      }
    }
  },
  plugins: []
};

export default config;
