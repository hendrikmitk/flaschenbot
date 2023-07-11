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
  active: Active;
  created: Created;
  flaschenpost_id: FlaschenpostID;
  name: Name;
}

export interface Active {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface Created {
  id: string;
  type: string;
  created_time: string;
}

export interface FlaschenpostID {
  id: string;
  type: string;
  number: number;
}

export interface Name {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  plain_text: string;
}
