export type StatKey = "hp" | "def" | "atk";

export type StatModifier = {
  type: "stat";
  stat: StatKey;
  value: number;
};

export type Modifier = StatModifier;
