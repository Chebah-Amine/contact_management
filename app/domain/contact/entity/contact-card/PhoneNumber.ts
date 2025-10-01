import {CommonPhoneNumber} from "@/domain/contact/entity/common/CommonPhoneNumber";

export interface PhoneNumber extends CommonPhoneNumber {
    idPhoneNumber: number | null;
}