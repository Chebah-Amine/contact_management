import {ContactOverview} from '@/domain/contact/entity/ContactOverview';
import {ContactPort} from '@/domain/contact/port/ContactPort';
import {Contact} from "@/domain/contact/entity/contact-card/detail/Contact";
import {ContactUpdate} from "@/domain/contact/entity/contact-card/update/ContactUpdate";
import {ContactCreate} from "@/domain/contact/entity/contact-card/create/ContactCreate";
export class ContactAdapter implements ContactPort {
    private api: string | undefined;

    constructor() {
        this.api = process.env.API_URL;
    }
    getAllContacts(): Promise<ContactOverview[]> {
        return fetch(`${this.api}/contacts`)
            .then(res => {
                if (!res.ok) {
                    // Handle non-successful responses
                    throw new Error(`Error: ${res.status}`);
                }
                return res.json();
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Failed to fetch contacts:', error);
                throw error;
            });
    }

    deleteContact(idContact: number): Promise<string> {
        return fetch(`${this.api}/contacts/` + idContact, {
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
                console.error('Failed to delete contact:' + idContact, error);
                throw error;
            });
    }

    getContactById(idContact: number): Promise<Contact> {
        return fetch(`${this.api}/contacts/${idContact}`, {
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
                console.error('Failed to fetch contact: ' +idContact, error);
                throw error;
            });
    }

    updateContact(contact: ContactUpdate): Promise<string> {
        return fetch(`${this.api}/contacts/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
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
                console.error('Failed to update contact:' + contact.idContact, error);
                throw error;
            });
    }

    createContact(contact: ContactCreate): Promise<string> {
        return fetch(`${this.api}/contacts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
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
                console.error('Failed to create contact:', error);
                throw error;
            });
    }
}
