import DisplayValue from '@/app/_components/DisplayValue';
import { GetTargetText } from '@/app/_constants/TargetStrings';
import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface ItemSkillCardProps {
    itemId: string;
    itemskill: any;
    editable: boolean;
}

export default function ItemSkillCard({ itemId, itemskill, editable }: ItemSkillCardProps) {
    const skill = itemskill.skill;
    const queryClient = useQueryClient();

    const deleteSkill = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/remove_skill/${itemId}?skill_id=${skill.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('item');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <div className='flex items-center space-x-3'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                <p>
                    <Link href={`/main/skills/${itemskill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.name}</span></Link>
                </p>
            </div>
            <p>
                <span className='px-4 text-gray-400 font-light'>{skill.description}</span>
                <div className='px-4 flex flex-col font-extralight italic '>
                    { (skill.conditions && skill.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{skill.conditions}</span> </p>}
                    {/*Damage Types*/}
                    <div className='flex'>
                        <DisplayValue previous_text='Deals ' value={skill.physical_damage} after_text=' Physical Damage'/>
                        <DisplayValue previous_text='Deals ' value={skill.magical_damage} after_text=' Magical Damage'/>
                        <DisplayValue value={skill.vitality_recovery} after_text=' Vitality'/>
                        <DisplayValue value={skill.essence_recovery} after_text=' Essence'/>
                    </div>
                    {/*Other Skill Details: Range, AoE, Targe, Etc*/}
                    <DisplayValue previous_text='Range: 'value={skill.range} after_text=' Mts' />
                    <DisplayValue previous_text='Area: 'value={skill.area_of_effect} after_text=' Mts' />
                    <DisplayValue previous_text='Target: 'value={GetTargetText(skill.target)} />
                    { skill.channeled && <DisplayValue value={'Channelled'}/>}
                    {/* Skill Effects*/}
                    {/* Skill Summons*/}
                    {/* Item Skill info */}
                    <div className='flex space-x-2'>
                        { (skill.cooldown && skill.cooldown !== "0") && <p className='font-light text-gray-400 text-sm'>Cooldown <span className='text-purple-400'>{itemskill.cooldown}</span> T </p>}
                        { (skill.essence_cost && skill.essence_cost !== "0") && <p className='font-light text-gray-400 text-sm'>Cost <span className='text-blue-500'>{itemskill.essence_cost}</span> E</p>}
                        { (skill.vitality_cost && skill.vitality_cost !== "0") && <p className='font-light text-gray-400 text-sm'>Cost <span className='text-red-500'>{itemskill.vitality_cost}</span> V</p>}
                    </div>
                </div>
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteSkill}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
