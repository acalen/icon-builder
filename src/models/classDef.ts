export type ClassId = string;

export type ClassBaseStats = {
    hp: number;
    def: number;
    atk: number;
};

export type ClassDef = {
  id: ClassId;
  name: string;
  description?: string;
  base: ClassBaseStats;
};
