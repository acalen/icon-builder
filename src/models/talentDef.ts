export type TalentId = string;

export type TalentModifiers = {
  hp?: number;
  def?: number;
  atk?: number;
};

export type TalentDef = {
  id: TalentId;
  name: string;
  description: string;
  modifiers: TalentModifiers;
};
