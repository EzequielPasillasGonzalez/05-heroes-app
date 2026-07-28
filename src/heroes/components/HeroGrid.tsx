import { HeroGridCard } from "@/heroes/components/HeroGridCard";

export const HeroGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {/* Hero Card 1 - Superman */}
      <HeroGridCard
        description="The Last Son of Krypton, protector of Earth and symbol of hope for all humanity."
        durability={100}
        group="Justice League"
        heroName="Superman"
        imageUrl="/placeholder.svg?height=300&width=300"
        intelligence={80}
        isFavorite={true}
        powers={["Super Strength", "Flight", "", "", "", "", ""]}
        secretIdentity="Clark Kent"
        speed={90}
        status={true}
        strength={100}
        typeOfCharacter="Hero"
        universe="DC"
        yearOfFirstAppeared="1938"
      />
    </div>
  );
};
