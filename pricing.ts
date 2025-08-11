export type Build = {
  base: "cucumber" | "green-bean" | "carrot" | "mixed";
  cut: "spears" | "chips" | "whole";
  brine: "classic" | "garlic-dill" | "spicy" | "sweet-heat";
  addOns: Array<"onion"|"jalapeno"|"peppercorn"|"dill"|"mustard-seed">;
  jarSize: "8oz" | "16oz" | "24oz";
  shipping: "standard" | "express";
  quantity: number;
};
const BASE = { cucumber: 1.5, "green-bean": 1.7, carrot: 1.6, mixed: 1.8 };
const CUT = { spears: 0.4, chips: 0.3, whole: 0.2 };
const BRINE = { classic: 0.6, "garlic-dill": 0.8, spicy: 0.9, "sweet-heat": 1.0 };
const ADDON = { onion: 0.15, jalapeno: 0.2, peppercorn: 0.1, dill: 0.12, "mustard-seed": 0.1 };
const JAR = { "8oz": 0.9, "16oz": 1.2, "24oz": 1.5 };
const PACKAGING = 1.0;
const PROCESSING = 3.5;
const LABEL = 0.35;
const PLATFORM_FEE_RATE = 0.029;
const PLATFORM_FEE_FLAT = 0.3;

export function unitCost(build: Build){
  const produce = BASE[build.base] + CUT[build.cut] + BRINE[build.brine] + build.addOns.reduce((s,a)=>s+ADDON[a],0);
  const jar = JAR[build.jarSize];
  const shipping = build.shipping === "standard" ? 6.5 : 11.0;
  const subtotal = produce + jar + PACKAGING + PROCESSING + LABEL + shipping;
  const fee = subtotal*PLATFORM_FEE_RATE + PLATFORM_FEE_FLAT;
  return +(subtotal + fee).toFixed(2);
}

export function priceWithMargin(build: Build, margin = 0.4){
  const cost = unitCost(build);
  const price = cost / (1 - margin);
  return +price.toFixed(2);
}
