import { createContext } from 'react';
import {ContactPort} from '@/domain/contact/port/ContactPort';
import {ContactAdapter} from '@/infrastructure/contact/adapter/ContactAdapter';
import {GroupPort} from "@/domain/group/port/GroupPort";
import {GroupAdapter} from "@/infrastructure/group/GroupAdapter";

interface IDependencyContext {
    contactPort: ContactPort;
    groupPort: GroupPort;
}

const defaultDependencies: IDependencyContext = {
    contactPort: new ContactAdapter(),
    groupPort: new GroupAdapter()
};

export const DependencyContext = createContext<IDependencyContext>(defaultDependencies);
