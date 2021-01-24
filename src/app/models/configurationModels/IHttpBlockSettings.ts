import { ResultTypes, WaitFor } from "src/app/enums";

export interface IHttpBlockSettings {
    url: string;
    restUrl: string;
    pathToSearchForm: Array<string>;
    searchFields: Array<string>;
    timeOut: number;
    resultsType: ResultTypes;
    resultsDomElem: string;
    waitFor: WaitFor;
    requiresSameDomainVisit: boolean;
}