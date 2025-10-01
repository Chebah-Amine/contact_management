import {GroupOverview} from "@/domain/group/entity/GroupOverview";
import {Group} from "@/domain/group/entity/group-card/detail/Group";
import {GroupUpdate} from "@/domain/group/entity/group-card/update/GroupUpdate";
import {GroupCreate} from "@/domain/group/entity/group-card/create/GroupCreate";

export interface GroupPort {
    getAllGroups: () => Promise<GroupOverview[]>;
    deleteGroup: (id: number) => Promise<string>;
    getGroupById: (id: number) => Promise<Group>;
    updateGroup: (group: GroupUpdate) => Promise<string>;
    createGroup: (group: GroupCreate) => Promise<string>;
}