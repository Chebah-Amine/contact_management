"use client";
import React, {useContext, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import OverviewCard from "@/components/common/OverviewCard";
import {DependencyContext} from "@/infrastructure/dependency.context";
import {GroupOverview} from "@/domain/group/entity/GroupOverview";
import Loader from "@/components/common/loader/Loader";
import ButtonAdd from "@/components/common/ButtonAdd";
import FormGroup from "@/scenes/group/FormGroup";
import SearchBar from "@/components/common/SearchBar";

const GroupHome: React.FC = () => {
    const { groupPort } = useContext(DependencyContext);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [groups, setGroups] = useState<GroupOverview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [create, setCreate] = useState<string | null>(searchParams.get("create"));
    const [isFormDisplayed, setIsFormDisplayed] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        setTrigger(false);
        groupPort.getAllGroups()
            .then(data => {
                setGroups(data);
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
            });
        if (create){
            setIsFormDisplayed(true);
        }
    }, [trigger]);

    const handleDelete = (id: number) => {
        setIsLoading(true);
        groupPort.deleteGroup(id)
            .then((message) => {
                return groupPort.getAllGroups();
            })
            .then((data => {
                setGroups(data);
                setIsLoading(false);
            }));
    }
    if (isLoading){
        return <Loader/>
    }
    else if (groups.length == 0){
        return <h1 className="text-3xl uppercase font-bold mt-5 mb-5">Vous n'avez aucun groupes</h1>
    }
    return (
        <div className="font-sans bg-gray-50 text-gray-600 my-4">
            <main className="flex flex-col p-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mt-10 mb-10">
                        Voici la liste de vos groupes !
                    </h1>
                    <div className="flex w-8/12 mb-10 ">
                        <ButtonAdd
                            title="Créer votre groupe"
                            onClick={() => {
                                router.replace("/groups");
                                setIsFormDisplayed(true);
                            }}
                        />
                        <SearchBar
                            onSearch={(query) => {
                                setGroups(groups.filter(g => g.name.toLowerCase().includes(query.toLowerCase())))
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center w-10/12 flex-wrap">
                        {groups.length > 0 ?
                            groups.map(group => {
                                return (
                                    <OverviewCard
                                        key={group.id}
                                        id={group.id}
                                        path={`/groups/${group.id}`}
                                        imageUrl={'/group_icon.png'}
                                        handleDelete={() => {handleDelete(group.id)}}
                                        handleUpdate={() => {
                                            router.push(`/groups/${group.id}?update=true`)
                                        }}
                                        name={group.name}
                                        desc={group.members + " membres"}
                                    />
                                )
                            })
                            :null
                        }
                    </div>
                </div>
                {
                    isFormDisplayed &&
                    <FormGroup
                        onClose={() => {
                            setIsFormDisplayed(false);
                        }}
                        handleSumitGroup={() => {
                            router.replace("/groups")
                            setCreate(null);
                            setTrigger(true);
                        }}
                    />
                }
            </main>
        </div>
    )
}

export default GroupHome;
