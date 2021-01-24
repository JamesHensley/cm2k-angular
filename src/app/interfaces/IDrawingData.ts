import { IBlockModel } from "./IBlock/IBlockModel";
import { IDrawing } from "./IDrawing";

export interface IDrawingData {
    newDiagramData: IDrawing;
    newBlockData: Array<IBlockModel>;
    appMode: string;
    editable: boolean;
    drawingLayout: string;
}
