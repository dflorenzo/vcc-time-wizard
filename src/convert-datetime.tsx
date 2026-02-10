import { Clipboard, showHUD, getPreferenceValues, LaunchProps } from "@raycast/api";

interface Preferences {
  timezone1: string;
  emoji1: string;
  timezone2: string;
  emoji2: string;
  timezone3: string;
  emoji3: string;
}

interface Arguments {
  datetime: string;
}

export default async function Command(props: LaunchProps<{ arguments: Arguments }>) {
  const prefs = getPreferenceValues<Preferences>();
  const { datetime } = props.arguments;

  // Parse datetime input (DD/MM HH:MM or MM-DD HH:MM)
  let date: Date | null = null;
  const currentYear = new Date().getFullYear();

  // Try DD/MM HH:MM
  const euMatch = datetime.match(/^(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})$/);
  if (euMatch) {
    const [, day, month, hours, minutes] = euMatch;
    date = new Date(currentYear, parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  }

  // Try MM-DD HH:MM
  if (!date) {
    const usMatch = datetime.match(/^(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})$/);
    if (usMatch) {
      const [, month, day, hours, minutes] = usMatch;
      date = new Date(currentYear, parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    }
  }

  if (!date || isNaN(date.getTime())) {
    await showHUD("❌ Invalid format. Use DD/MM HH:MM");
    return;
  }

  const formatTime = (timezone: string, emoji: string): string | null => {
    if (!timezone || !emoji) return null;
    const timeStr = date!.toLocaleString("en-GB", {
      timeZone: timezone,
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${emoji} ${timeStr}`;
  };

  const times = [
    formatTime(prefs.timezone1, prefs.emoji1),
    formatTime(prefs.timezone2, prefs.emoji2),
    formatTime(prefs.timezone3, prefs.emoji3),
  ].filter(Boolean);

  const text = times.join(" | ");

  await Clipboard.copy(text);
  await showHUD("Times copied to clipboard! 📋");
}
