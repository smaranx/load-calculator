export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface Cargo {
  type: string;
  name: string;
  id: string;
  weight: number;
  fs: number;
  width: number;
  length: number;
  index: number;
  fill: string;
  position: Position;
  centerOfGravity: Position;
}
