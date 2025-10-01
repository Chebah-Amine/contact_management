import { ContactOverview } from '../entity/ContactOverview';
import {Contact} from "@/domain/contact/entity/contact-card/detail/Contact";
import {ContactUpdate} from "@/domain/contact/entity/contact-card/update/ContactUpdate";
import {ContactCreate} from "@/domain/contact/entity/contact-card/create/ContactCreate";

export interface ContactPort {
    getAllContacts: () => Promise<ContactOverview[]>;
    deleteContact: (idContact: number) => Promise<string>;
    getContactById: (idContact: number) => Promise<Contact>;
    updateContact: (contact: ContactUpdate) => Promise<string>;
    createContact: (contact: ContactCreate) => Promise<string>;
}
