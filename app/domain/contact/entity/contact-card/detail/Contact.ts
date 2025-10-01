import {Address} from "@/domain/contact/entity/contact-card/Address";
import {ContactGroup} from "@/domain/contact/entity/contact-card/ContactGroup";
import {PhoneNumber} from "@/domain/contact/entity/contact-card/PhoneNumber";
import {CommonContact} from "@/domain/contact/entity/common/CommonContact";
export interface Contact extends CommonContact {
    idContact: number;
    address: Address;
    phoneNumbers: PhoneNumber[];
    groups: ContactGroup[];

}