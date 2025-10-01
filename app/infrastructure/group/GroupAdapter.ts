import {GroupPort} from "@/domain/group/port/GroupPort";
import {GroupOverview} from "@/domain/group/entity/GroupOverview";
import {Group} from "@/domain/group/entity/group-card/detail/Group";
import {GroupUpdate} from "@/domain/group/entity/group-card/update/GroupUpdate";
import {GroupCreate} from "@/domain/group/entity/group-card/create/GroupCreate";

export class GroupAdapter implements GroupPort {

    private api: string | undefined;

    constructor() {
        this.api = process.env.API_URL;
    }
    getAllGroups(): Promise<GroupOverview[]> {
        return fetch(`${this.api}/groups`)
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.json();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to fetch groups:', error);
                throw error;
            });
    }

    deleteGroup(id: number): Promise<string> {
        return fetch(`${this.api}/groups/` + id, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.text();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to delete group:' + id, error);
                throw error;
            });
    }

    getGroupById(id: number): Promise<Group> {
        return fetch(`${this.api}/groups/${id}`, {
            method: "GET"
        })
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.json();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to fetch group with ID: ' + id, error);
                throw error;
            });
    }

    updateGroup(group: GroupUpdate): Promise<string> {
        return fetch(`${this.api}/groups/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.text();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to update group:' + group.idGroup, error);
                throw error;
            });
    }

    createGroup(group: GroupCreate): Promise<string> {
        return fetch(`${this.api}/groups`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group)
        })
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.text();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to create group:', error);
                throw error;
            });
    }
}