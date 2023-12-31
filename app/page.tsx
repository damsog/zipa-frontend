import MainOptionCard from './mainOptionCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
           before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
           after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
           before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <MainOptionCard title="General" description="General description for battle, units spells and combat rules" link="/main/general" />
        <MainOptionCard title="Race Groups" description="Playable Races, their cultures, traits, units and more" link="/main/race_groups" />
        <MainOptionCard title="Races" description="Playable Races, their cultures, traits, units and more" link="/main/races" />
        <MainOptionCard title="Cultures" description="Playable Cultures, their cultures, traits, units and more" link="/main/cultures" />
        <MainOptionCard title="Beliefs" description="Playable Beliefs, their cultures, traits, units and more" link="/main/beliefs" />
        <MainOptionCard title="Specializations" description="Unit martial training routes" link="/main/specializations" />
        <MainOptionCard title="Traits" description="All the available Traits" link="/main/traits" />
        <MainOptionCard title="Skills" description="All The available abilities" link="/main/skills" />
        <MainOptionCard title="Items" description="All the available items" link="/main/items" />
        <MainOptionCard title="Effects" description="All the available Effecs" link="/main/effects" />
        <MainOptionCard title="Units" description="All the available Effecs" link="/main/units" />
        <MainOptionCard title="Combat Calculator" description="All the available Effecs" link="/main/combat_calculator" />
      </div>
    </main>
  )
}
