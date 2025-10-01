import {CommonGroup} from "@/domain/CommonGroup";

export interface GroupUpdate extends CommonGroup{
    idGroup: number;
    idsContact: number[];
}