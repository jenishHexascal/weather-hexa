import React from "react";
import { HeavyRainIcon } from "../icons/HeavyRainIcon";
import { OvercastIcon } from "../icons/OvercastCloudIcon";
import { ModerateRainIcon } from "../icons/ModerateRainIcon";
import { LightRainIcon } from "../icons/LightRainIcon";
import { SnowIcon } from "../icons/SnowIcon";
import { BrokenCastIcon } from "../icons/BrokenCast";
import { ClearSkyIcon } from "../icons/ClearSkyIcon";
import { StromIcon } from "../icons/StromIcon";

type WeatherIconProps = {
  size?: number;
};

// Updated SVG icons for forecast codes
export const weatherIcons: Record<
  string,
  (props?: WeatherIconProps) => React.ReactNode
> = {
  "1": ({ size = 100 } = {}) => (
    // Broken clouds
    <ClearSkyIcon size={size} />
  ),
  "4": ({ size = 100 } = {}) => (
    // Broken clouds
    <BrokenCastIcon size={size} />
  ),
  "8": ({ size = 100 } = {}) => (
    // Overcast clouds
    <OvercastIcon size={size} />
  ),
  "18": ({ size = 100 } = {}) => (
    // Light rain / Partly cloudy with rain
    <LightRainIcon size={size} />
  ),
  "19": ({ size = 100 } = {}) => (
    // Moderate rain / Cloudy
    <ModerateRainIcon size={size} />
  ),
  "20": ({ size = 100 } = {}) => (
    // Heavy rain
    <HeavyRainIcon size={size} />
  ),
  "11": ({ size = 100 } = {}) => (
    // Thunderstorm
    <StromIcon size={size} />
  ),
  "13": ({ size = 100 } = {}) => (
    // Snow
    <SnowIcon size={size} />
  ),
};