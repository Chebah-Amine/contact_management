import {Group} from "@/domain/group/entity/group-card/detail/Group";
import {GroupUpdate} from "@/domain/group/entity/group-card/update/GroupUpdate";
import {GroupCreate} from "@/domain/group/entity/group-card/create/GroupCreate";

export function toGroupUpdate(group: Group): GroupUpdate{
    return {
        idGroup: group.idGroup,
        name: group.name,
        idsContact: group.contacts.map(contact => contact.idContact)
    }
}

export function toGroupCreate(group: Group): GroupCreate{
    return {
        name: group.name,
        idsContact: group.contacts.map(contact => contact.idContact)
    }
}