import {CommonGroup} from "@/domain/CommonGroup";

export interface GroupOverview extends CommonGroup{
    id: number;
    members: number;
}