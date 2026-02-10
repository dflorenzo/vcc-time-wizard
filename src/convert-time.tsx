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
  time: string;
}

export default async function Command(props: LaunchProps<{ arguments: Arguments }>) {
  const prefs = getPreferenceValues<Preferences>();
  const { time } = props.arguments;

  // Parse the time input (HH:MM format)
  const match = time.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    await showHUD("❌ Invalid time format. Use HH:MM");
    return;
  }

  const [, hours, minutes] = match;
  const now = new Date();
  now.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  const formatTime = (timezone: string, emoji: string): string | null => {
    if (!timezone || !emoji) return null;
    const timeStr = now.toLocaleString("en-GB", {
      timeZone: timezone,
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
