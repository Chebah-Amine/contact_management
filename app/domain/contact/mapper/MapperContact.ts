import {ContactUpdate} from "@/domain/contact/entity/contact-card/update/ContactUpdate";
import {Contact} from "@/domain/contact/entity/contact-card/detail/Contact";
import {ContactCreate} from "@/domain/contact/entity/contact-card/create/ContactCreate";

export function toUpdateContact(data: Contact): ContactUpdate {
    return {
        idContact: data.idContact,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: {
            idAddress: data.address.idAddress,
            country: data.address.country,
            zip: data.address.zip,
            city: data.address.city,
            street: data.address.street,
        },
        phoneNumbers: data.phoneNumbers,
        idsContactGroup: data.groups.map(group => group.idContactGroup), // Supposer que chaque groupe a un idContactGroup
    };
}

export function toCreteContact(data: Contact): ContactCreate {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: {
            country: data.address.country,
            zip: data.address.zip,
            city: data.address.city,
            street: data.address.street,
        },
        phoneNumbers: data.phoneNumbers.map(phone => {
            return {
                phoneKind: phone.phoneKind,
                phoneNumber: phone.phoneNumber
            }
        }),
        idsContactGroup: data.groups.map(group => group.idContactGroup), // Supposer que chaque groupe a un idContactGroup
    };
}
