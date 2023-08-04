import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface ItemOptionProps {
    id: string;
    name: string;
    description: string;
    conditions: string;
    rarity: string;
    magic_effectiveness: string;
    physical_damage: string;
    magical_damage: string;
    healing: string;
    vitality_recovery: string;
    essence_recovery: string;
    vitality: string;
    range: string;
    damage: string;
    armor: string;
    magic_armor: string;
    essence: string;
    agility: string;
    hit_chance: string;
    evasion: string;
    hit_rate: string;
    movement: string;
    ammo: string;
    shield: string;
    skills: any;
    styles: string;
}

function DisplayItemValue(props: {value: string}) {
    const value = props.value.split("+");

    if(props.value !== "0"){
        return <span className='text-green-500 font-light'>{props.value}</span>
    }else{
        return null;
    }
}

export default function ItemOption(item: ItemOptionProps) {
    const queryClient = useQueryClient();


    const deleteItem = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${item.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('items');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    const paintRarity = (rarity: string) => {
        switch(rarity){
            case "COMMON":
                return "text-gray-100";
            case "UNCOMMON":
                return "text-green-700";
            case "RARE":
                return "text-blue-600";
            case "EPIC":
                return "text-purple-700";
            case "LEGENDARY":
                return "text-orange-500";
            default:
                return "text-gray-100";
        }
    }

    return (
    <div className={`${item.styles}`}>
        <div className='flex items-center justify-between'>
        <div>
            <Link href={`/items/${item.id}`}>
                <div className='my-2'>
                    <h3 className={`font-bold ${paintRarity(item.rarity)}`}>{item.name}</h3>
                    <h4 className={` text-xs italic font-light ${paintRarity(item.rarity)}`}>{item.rarity}</h4>
                </div>
            </Link>
            <div>
                <p className='my-1 text-gray-100 '>{item.description}</p>
                <div className='flex flex-col font-extralight italic '>
                    {/*Damage Types*/}
                    <div className='flex flex-col'>
                        { (item.conditions && item.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{item.conditions}</span> </p>}
                        { (item.physical_damage  && item.physical_damage !== "0") && <p> <span className='text-green-500 font-light'>{item.physical_damage}</span> Physical Damage   </p>}
                        { (item.magical_damage && item.magical_damage !== "0") && <p> <span className='text-green-500 font-light'>{item.magical_damage}</span> Magical Damage   </p>}
                        { (item.healing && item.healing !== "0") && <p> <span className='text-green-500 font-light'>{item.healing}</span>   </p>}
                        { (item.vitality_recovery && item.vitality_recovery !== "0") && <p> <span className='text-green-500 font-light'>{item.vitality_recovery}</span> Recovering   </p>}
                        { (item.essence_recovery && item.essence_recovery !== "0") && <p> <span className='text-green-500 font-light'>{item.essence_recovery}</span> Essence Recovering   </p>}
                        { (item.vitality && item.vitality !== "0") && <p> <span className='text-green-500 font-light'>{item.vitality}</span> Vitality   </p>}
                        { (item.range && item.range !== "0") && <p> <span className='text-green-500 font-light'>{item.range}</span> Range   </p>}
                        { (item.damage && item.damage !== "0") && <p> <span className='text-green-500 font-light'>{item.damage}</span> Damage   </p>}
                        { (item.armor && item.armor !== "0") && <p> <span className='text-green-500 font-light'>{item.armor}</span> Armor   </p>}
                        { (item.magic_armor && item.magic_armor !== "0") && <p> <span className='text-green-500 font-light'>{item.magic_armor}</span> Magic Armor   </p>}
                        { (item.essence && item.essence !== "0") && <p> <span className='text-green-500 font-light'>{item.essence}</span> Essence   </p>}
                        { (item.agility && item.agility !== "0") && <p> <span className='text-green-500 font-light'>{item.agility}</span> Agility   </p>}
                        { (item.hit_chance && item.hit_chance !== "0") && <p> <span className='text-green-500 font-light'>{item.hit_chance}</span> Hit Chance   </p>}
                        { (item.evasion && item.evasion !== "0") && <p> <span className='text-green-500 font-light'>{item.evasion}</span> Evasion   </p>}
                        { (item.hit_rate && item.hit_rate !== "0") && <p> <span className='text-green-500 font-light'>{item.hit_rate}</span> Hit Rate   </p>}
                        { (item.movement && item.movement !== "0") && <p> <span className='text-green-500 font-light'>{item.movement}</span> Movement   </p>}
                        { (item.ammo && item.ammo !== "0") && <p> <span className='text-green-500 font-light'>{item.ammo}</span> Ammo   </p>}
                        { (item.shield && item.shield !== "0") && <p> <span className='text-green-500 font-light'>{item.shield}</span> Shield   </p>}
                    </div>
                    {/* Item Skills*/}
                    { (item.skills && item.skills.length > 0) && 
                            <p>
                                Effects:
                            </p>}
                            {item.skills.map((skill: any) => {
                                return (
                                <div className='px-4 font-light'>
                                    <p>
                                        <Link href={`/skills/${skill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.skill.name}</span></Link> lasting <span className='text-purple-400'>{skill.duration}</span> T
                                    </p>
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{skill.skill.description}</span>
                                    </p>
                                </div>
                                )
                            })}                        
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteItem}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}