import {CommonGroup} from "@/domain/CommonGroup";

export interface GroupCreate extends CommonGroup{
    idsContact: number[];
}