export interface FileAsset {
  uri: string;
  name: string;
  mimeType: string;
}

export interface FileState {
  type: 'success';
  assets: FileAsset[];
}

export type DocumentPickerResult = FileState | { type: 'cancel' };