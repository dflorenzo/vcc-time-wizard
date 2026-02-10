import { Clipboard, showHUD, getPreferenceValues } from "@raycast/api";

interface Preferences {
  timezone1: string;
  emoji1: string;
  timezone2: string;
  emoji2: string;
  timezone3: string;
  emoji3: string;
}

export default async function Command() {
  const prefs = getPreferenceValues<Preferences>();
  const now = new Date();

  const formatTime = (timezone: string, emoji: string): string | null => {
    if (!timezone || !emoji) return null;
    const time = now.toLocaleString("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${emoji} ${time}h`;
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
