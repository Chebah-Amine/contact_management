import {GroupContact} from "@/domain/group/entity/group-card/detail/GroupContact";
import {CommonGroup} from "@/domain/CommonGroup";

export interface Group extends CommonGroup{
    idGroup: number;
    contacts: GroupContact[];
}