export interface ITreeNodeBlock {
  nodeName: string;
  nodeType: string;
  children?: Array<ITreeNodeBlock>;
}
