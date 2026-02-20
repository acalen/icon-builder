export type Requirement =
  | { type: "hasClass"; classId: string }
  | { type: "minStat"; stat: "hp" | "def" | "atk"; value: number };