import {CommonContact} from "@/domain/contact/entity/common/CommonContact";
import {CommonAddress} from "@/domain/contact/entity/common/CommonAddress";
import {CommonPhoneNumber} from "@/domain/contact/entity/common/CommonPhoneNumber";

export interface ContactCreate extends CommonContact {
    address: CommonAddress;
    phoneNumbers: CommonPhoneNumber[];
    idsContactGroup: number[];
}