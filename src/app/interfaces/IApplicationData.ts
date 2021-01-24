import { IBlockServiceModel } from "../models/configurationModels/IBlockServiceModel";
import { IBlockDefinitions, IBlockSettings } from "../services/appConfigService";

export interface IAppConfig {
    blockDefs: Array<IBlockDefinitions>,
    blockSettings: Array<IBlockSettings>,
    serviceTypes: Array<IBlockServiceModel>,
    fieldTypes: Array<any>
}
