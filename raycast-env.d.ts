/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Timezone 1 - First timezone (e.g., Europe/Madrid) */
  "timezone1": string,
  /** Emoji 1 - Emoji for first timezone */
  "emoji1": string,
  /** Timezone 2 - Second timezone (e.g., America/Argentina/Buenos_Aires) */
  "timezone2": string,
  /** Emoji 2 - Emoji for second timezone */
  "emoji2": string,
  /** Timezone 3 - Third timezone (e.g., Atlantic/Canary) */
  "timezone3": string,
  /** Emoji 3 - Emoji for third timezone */
  "emoji3": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `copy-times` command */
  export type CopyTimes = ExtensionPreferences & {}
  /** Preferences accessible in the `convert-time` command */
  export type ConvertTime = ExtensionPreferences & {}
  /** Preferences accessible in the `convert-datetime` command */
  export type ConvertDatetime = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `copy-times` command */
  export type CopyTimes = {}
  /** Arguments passed to the `convert-time` command */
  export type ConvertTime = {
  /** HH:MM */
  "time": string
}
  /** Arguments passed to the `convert-datetime` command */
  export type ConvertDatetime = {
  /** DD/MM HH:MM */
  "datetime": string
}
}

