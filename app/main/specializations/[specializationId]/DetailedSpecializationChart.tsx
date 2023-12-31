import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import NewOptionDialogWithSelection from '../../../_components/NewOptionDialogWithSelection';
import TagObjectsSelector, { OjbectOptionType } from '../TagObjectsSelector';
import { opbjectTypeOptions } from '../NewSpecializationDialog';
import { paintTier, writeTier } from '@/app/_libs/text_paint_methods';
import TraitCard from '@/app/_components/InformationCards/TraitCard';
import SkillCard from '../../../_components/InformationCards/SkillCard';
import ItemCard from '@/app/_components/InformationCards/ItemCard';

interface Specialization {
    id: string;
    name: string;
    description: string;
    vitality?: number;
    strength?: number;
    dexterity?: number;
    mind?: number;
    faith?: number;
    armor?: number;
    magic_armor?: number;
    essence?: number;
    agility?: number;
    hit_chance?: number;
    evasion?: number;
    hit_rate?: number;
    load_capacity?: number;
    movement?: number;
    weapon_proficiencies?: string;
    tier?: number;
    skills?: string[];
    items?: string[];
    traits?: string[];
}

type DetailedSpecializationChartProps = {
    specialization: Specialization;
    styles?: string;
}

export const splitWeaponProficiencies = (weapon_proficiencies: string | undefined) => {
    if(weapon_proficiencies === undefined) return [];

    return weapon_proficiencies?.split("|");
}

const objectTypesListToDict = (objectTypesList: string[]) => {
    return objectTypesList.map((objectType) => {
        return {label: objectType, value: objectType.replace(/_/g," "), realValue: objectType}
    });
};

export default function DetailedSpecializationChart({specialization, styles}: DetailedSpecializationChartProps) {
    const [ editing, setEditing ] = useState(false);
    let [ weaponProficiencies, setWeaponProficiencies ] = useState<string>(specialization.weapon_proficiencies ?? "");
    const { register, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm<Specialization>();
    const queryClient = useQueryClient();

    // useState is async, so we need to use useEffect to set the value for the Form after the state is set
    useEffect(() => {
        setValue("weapon_proficiencies", weaponProficiencies)
    }, [weaponProficiencies])

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Specialization> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/update/${specialization.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`specialization`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }

    function handleWeaponProficienciesChange(weaponProficiencies: string) {
        setWeaponProficiencies(weaponProficiencies);
    }

    return (
    <>
        <div className="transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                  border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h2 className={`mb-3 text-xl font-medium`}>
              Detailed Information{' '}
            </h2>
            <form className='rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-2 lg:grid lg:grid-cols-4'>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/tier.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Tier</h1>
                        {editing ?<input 
                            {...register("tier", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="tier"
                            disabled={!editing}
                            placeholder={specialization.tier ? specialization.tier.toString() : "0"}
                        /> : <h1 className={`my-2 py-3 text-2xl font-extrabold font-serif ${paintTier(specialization.tier)}`}>{writeTier(specialization.tier)}</h1> }                              
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/vitality.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Vitality</h1>
                        {editing ? <input 
                            {...register("vitality", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="vitality"
                            disabled={!editing}
                            placeholder={(specialization.vitality && specialization.vitality !== 0 ) ? specialization.vitality?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.vitality && specialization.vitality !== 0 ) ? specialization.vitality?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/strength.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Strength</h1>
                        {editing ? <input 
                            {...register("strength", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="strength"
                            disabled={!editing}
                            placeholder={(specialization.strength && specialization.strength !== 0 ) ? specialization.strength?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.strength && specialization.strength !== 0 ) ? specialization.strength?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/dexterity.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Dexterity</h1>
                        {editing ? <input 
                            {...register("dexterity", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="dexterity"
                            disabled={!editing}
                            placeholder={(specialization.dexterity && specialization.dexterity !== 0 ) ? specialization.dexterity?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.dexterity && specialization.dexterity !== 0 ) ? specialization.dexterity?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/mind.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Mind</h1>
                        {editing ? <input 
                            {...register("mind", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="mind"
                            disabled={!editing}
                            placeholder={(specialization.mind && specialization.mind !== 0 ) ? specialization.mind?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.mind && specialization.mind !== 0 ) ? specialization.mind?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/faith.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Faith</h1>
                        {editing ? <input 
                            {...register("faith", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="faith"
                            disabled={!editing}
                            placeholder={(specialization.faith && specialization.faith !== 0 ) ? specialization.faith?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.faith && specialization.faith !== 0 ) ? specialization.faith?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/armor.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Armor</h1>
                        {editing ? <input 
                            {...register("armor", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="armor"
                            disabled={!editing}
                            placeholder={(specialization.armor && specialization.armor !== 0 ) ? specialization.armor?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.armor && specialization.armor !== 0 ) ? specialization.armor?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/magic_armor.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Magic Armor</h1>
                        {editing ? <input 
                            {...register("magic_armor", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="magic_armor"
                            disabled={!editing}
                            placeholder={(specialization.magic_armor && specialization.magic_armor !== 0 ) ? specialization.magic_armor?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.magic_armor && specialization.magic_armor !== 0 ) ? specialization.magic_armor?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/essence.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Essence</h1>
                        {editing ? <input 
                            {...register("essence", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="essence"
                            disabled={!editing}
                            placeholder={(specialization.essence && specialization.essence !== 0 ) ? specialization.essence?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.essence && specialization.essence !== 0 ) ? specialization.essence?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/agility.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Agility</h1>
                        {editing ? <input 
                            {...register("agility", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="agility"
                            disabled={!editing}
                            placeholder={(specialization.agility && specialization.agility !== 0 ) ? specialization.agility?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.agility && specialization.agility !== 0 ) ? specialization.agility?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/hit_chance.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />  
                        <h1>Hit Chance</h1>
                        {editing ? <input 
                            {...register("hit_chance", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="hit_chance"
                            disabled={!editing}
                            placeholder={(specialization.hit_chance && specialization.hit_chance !== 0 ) ? specialization.hit_chance?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.hit_chance && specialization.hit_chance !== 0 ) ? specialization.hit_chance?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/evasion.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Evasion</h1>
                        {editing ? <input 
                            {...register("evasion", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="evasion"
                            disabled={!editing}
                            placeholder={(specialization.evasion && specialization.evasion !== 0 ) ? specialization.evasion?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.evasion && specialization.evasion !== 0 ) ? specialization.evasion?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/hit_rate.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Hit Rate</h1>
                        {editing ? <input 
                            {...register("hit_rate", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="hit_rate"
                            disabled={!editing}
                            placeholder={(specialization.hit_rate && specialization.hit_rate !== 0 ) ? specialization.hit_rate?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.hit_rate && specialization.hit_rate !== 0 ) ? specialization.hit_rate?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/weight.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Load Capacity</h1>
                        {editing ? <input 
                            {...register("load_capacity", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="load_capacity"
                            disabled={!editing}
                            placeholder={(specialization.load_capacity && specialization.load_capacity !== 0 ) ? specialization.load_capacity?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.load_capacity && specialization.load_capacity !== 0 ) ? specialization.load_capacity?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <img src={`/gen_icons/movement.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <h1>Movement</h1>
                        {editing ? <input 
                            {...register("movement", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="movement"
                            disabled={!editing}
                            placeholder={(specialization.movement && specialization.movement !== 0 ) ? specialization.movement?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(specialization.movement && specialization.movement !== 0 ) ? specialization.movement?.toString() : "0"}</h1>}                           
                    </div>
                    <div className={`flex items-center space-x-2 col-span-4`}>
                        <h1>Weapon Proficiencies</h1>
                        {editing ?<>
                            <input 
                                {...register("weapon_proficiencies", { required: false })}
                                className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                                type="text"
                                name="weapon_proficiencies"
                                disabled={!editing}
                            />
                            <TagObjectsSelector objectTypeOptionsSelected={objectTypesListToDict(splitWeaponProficiencies(weaponProficiencies))} objectTypeOptions={opbjectTypeOptions} updateObjectsOutput={handleWeaponProficienciesChange} style='w-full grid grid-cols-3 gap-1' />
                        </> : <h1 className={`my-2 py-3 flex space-x-1`}>{splitWeaponProficiencies(specialization.weapon_proficiencies).map((weapon_proficiency: string) => {
                            return (<div key={weapon_proficiency} className='border-2 border-yellow-500/50 rounded-xl w-20 p-1 bg-black'>
                                        <h1 className='text-xs text-yellow-200/70'>{weapon_proficiency.replace(/_/g," ")}</h1>
                                    </div>
                                    )
                        })}</h1> }
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ specialization.description ? specialization.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Traits</h1>
                            {editing && <NewOptionDialogWithSelection 
                                    selectionEndpoint={'/traits/'} 
                                    selecttionQueryKey={'traits'}
                                    selectionKey='trait'
                                    selectionIdOnEndpoint={true}
                                    addEndpoint={`/specializations/add_trait/${specialization.id}?trait_id=`}
                                    invalidationKey={`specialization`}
                                    title={'Add Traits'}
                                    description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'}
                                    styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' />}
                        </div>
                        {(specialization.traits && specialization.traits.length > 0) ? specialization.traits.map((trait: any) => {
                            return <TraitCard key={trait.trait.id} ownerTrait={trait} ownerId={specialization.id} editable={editing} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Skills</h1>
                            {editing && <NewOptionDialogWithSelection
                                selectionEndpoint={'/skills/'} 
                                selecttionQueryKey={'skills'}
                                selectionKey='skill'
                                selectionIdOnEndpoint={true}
                                addEndpoint={`/specializations/add_skill/${specialization.id}?skill_id=`}
                                invalidationKey={`specialization`} 
                                title={'Add Skills'}
                                description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                                styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' />}
                        </div>
                        {(specialization.skills && specialization.skills.length > 0) ? specialization.skills.map((skill: any) => {
                            return <SkillCard key={skill.skill.id} specializationskill={skill} specializationId={specialization.id} editable={editing} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Items</h1>
                            {editing && <NewOptionDialogWithSelection 
                                selectionEndpoint={'/items/'} 
                                selecttionQueryKey={'items'}
                                selectionKey='item'
                                selectionIdOnEndpoint={false}
                                addEndpoint={`/specializations/add_item/${specialization.id}?item_id=`}
                                invalidationKey={`specialization`} 
                                extraFormParams={['quantity']}
                                title={'Add Items'}
                                description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                                styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'/>}
                        </div>
                        {(specialization.items && specialization.items.length > 0) ? specialization.items.map((item: any) => {
                            return <ItemCard key={item.item.id} OwnerItem={item} editable={editing} deleteEndpoint={`/specializations/remove_item/${specialization.id}?item_id=`} invaildateQueryKey={'specialization'} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
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
    </>
    )
}
