export interface FileUpload {
  name: string;
  data: { type: string; data: any[] };
  encoding: string;
  size: number;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: Function;
}
