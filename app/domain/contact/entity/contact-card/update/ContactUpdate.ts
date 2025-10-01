import {CommonContact} from "@/domain/contact/entity/common/CommonContact";
import {Address} from "@/domain/contact/entity/contact-card/Address";
import {PhoneNumber} from "@/domain/contact/entity/contact-card/PhoneNumber";

export interface ContactUpdate extends CommonContact{
    idContact: number;
    address: Address;
    phoneNumbers: PhoneNumber[];
    idsContactGroup: number[];
}