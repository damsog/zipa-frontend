import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
//import RaceGroupUnitsDisclosure from './RaceGroupUnitsDisclosure';

interface RaceGroup {
    id: string;
    name: string;
    description: string;
    identity: string;
    aspects: string;
    unit_specializations?: string[];
    traits?: string[];
}

type DetailedRaceGroupChartProps = {
    race_group: RaceGroup;
    styles?: string;
}

const getRaceGroupUnitSpecializations = async (race_groupId: string) => {

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/race_group/${race_groupId}`, {
            method: 'GET',
        });
        console.log(`Response: ${JSON.stringify(response)}`);


        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function DetailedRaceGroupChart({race_group, styles}: DetailedRaceGroupChartProps) {
    const [ editing, setEditing ] = useState(false);
    let [ unitsOrganized, setUnitsOrganized ] = useState<any>(undefined);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<RaceGroup>();
    //const query = useQuery([`race_groupSpecializations`, race_group.id], () => getRaceGroupUnitSpecializations(race_group.id) );
    const queryClient = useQueryClient();

    //useEffect(() => {
    //    if(query.data){
    //        organizeSpecializations(query.data)
    //    }
    //}, [query.data])

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<RaceGroup> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/race_groups/update/${race_group.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`race_group`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }

    //const organizeSpecializations = (specializations: any) => {
    //    let tier_i_list = query.data.filter( (unit: any) => unit.tier === 1 )
    //    let tier_ii_list = query.data.filter( (unit: any) => unit.tier === 2 )
    //    let tier_iii_list = query.data.filter( (unit: any) => unit.tier === 3 )
    //    let tier_iv_list = query.data.filter( (unit: any) => unit.tier === 4 )
    //    let tier_v_list = query.data.filter( (unit: any) => unit.tier === 5 )
    //    setUnitsOrganized( 
    //        [
    //            {title: 1, information: tier_i_list},
    //            {title: 2, information: tier_ii_list},
    //            {title: 3, information: tier_iii_list},
    //            {title: 4, information: tier_iv_list},
    //            {title: 5, information: tier_v_list},
    //        ]
    //    )
    //}

    //if (query.isLoading) return <h2>Loading...</h2>

    return (
        <div className="transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                  border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h2 className={`mb-3 text-xl font-medium`}>
              Detailed Information{' '}
            </h2>
            <form className='rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-2 lg:grid lg:grid-cols-4'>

                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ race_group.description ? race_group.description : "Description" }
                        />                                
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                        onClick={onCancel}
                        >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                    {editing && <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                      cursor-pointer'>
                        <input type="submit" value="Save" className='text-gray-400 text-sm cursor-pointer'/>
                    </div>}
                </div>
            </form>
        </div>
    )
}
