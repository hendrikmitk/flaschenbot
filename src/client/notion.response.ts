export interface Result {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: Timestamp;
  last_edited_by: Timestamp;
  cover: unknown;
  icon: unknown;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
  public_url: unknown;
}

export interface Timestamp {
  object: string;
  id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  active: CheckboxInterface;
  article_name: TitleInterface;
  flaschenpost_id: NumberInterface;
  created: CreatedTimeInterface;
  last_edited: LastEditedTimeInterface;
}

export interface CheckboxInterface {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface CreatedTimeInterface {
  id: string;
  type: string;
  created_time: string;
}

export interface LastEditedTimeInterface {
  id: string;
  type: string;
  last_edited_time: string;
}

export interface NumberInterface {
  id: string;
  type: string;
  number: number;
}

export interface TitleInterface {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  plain_text: string;
}
