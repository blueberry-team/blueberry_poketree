import type { StaticImageData } from "next/image";

// 포켓몬 이미지 동적 import - 테스트용 (1번만)
import Pokemon1Active from "@/assets/images/pokedex/active/1-active.png";
import Pokemon2Active from "@/assets/images/pokedex/active/2-active.png";
import Pokemon3Active from "@/assets/images/pokedex/active/3-active.png";
import Pokemon1Inactive from "@/assets/images/pokedex/inactive/1-inactive.png";
import Pokemon2Inactive from "@/assets/images/pokedex/inactive/2-inactive.png";
import Pokemon3Inactive from "@/assets/images/pokedex/inactive/3-inactive.png";

// 클라이언트에서 관리하는 포켓몬 기본 정보 타입
export interface PokemonInfo {
  id: number;
  name: string;
  description: string;
  imageActive: string | StaticImageData;
  imageInactive: string | StaticImageData;
}

// 모든 포켓몬의 정보 (클라이언트에서 관리)
export const POKEMON_DATA: PokemonInfo[] = [
  {
    id: 1,
    name: "Bulbasaur",
    description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    imageActive: Pokemon1Active,
    imageInactive: Pokemon1Inactive,
  },
  {
    id: 2,
    name: "Ivysaur",
    description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs. The bulb absorbs nutrients to prepare for evolution.",
    imageActive: Pokemon2Active,
    imageInactive: Pokemon2Inactive,
  },
  {
    id: 3,
    name: "Venusaur",
    description: "The flower on its back catches the sun's rays and converts them into energy. Its flower is said to take on vivid colors if it gets plenty of nutrition and sunlight.",
    imageActive: Pokemon3Active,
    imageInactive: Pokemon3Inactive,
  },
  {
    id: 4,
    name: "Charmander",
    description: "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when it is happy and blazes when it is enraged.",
    imageActive: "/assets/images/pokedex/active/4-active.png",
    imageInactive: "/assets/images/pokedex/inactive/4-inactive.png",
  },
  {
    id: 5,
    name: "Charmeleon",
    description: "It has a barbaric nature and will mercilessly beat down foes with its sharp claws. When it swings its burning tail, the temperature rises higher and higher.",
    imageActive: "/assets/images/pokedex/active/5-active.png",
    imageInactive: "/assets/images/pokedex/inactive/5-inactive.png",
  },
  {
    id: 6,
    name: "Charizard",
    description: "It spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally by breathing flames from its mouth.",
    imageActive: "/assets/images/pokedex/active/6-active.png",
    imageInactive: "/assets/images/pokedex/inactive/6-inactive.png",
  },
  {
    id: 7,
    name: "Squirtle",
    description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth to fight enemies.",
    imageActive: "/assets/images/pokedex/active/7-active.png",
    imageInactive: "/assets/images/pokedex/inactive/7-inactive.png",
  },
  {
    id: 8,
    name: "Wartortle",
    description: "Its tail is large and covered with rich, thick fur that deepens in color with age. It is considered a symbol of longevity.",
    imageActive: "/assets/images/pokedex/active/8-active.png",
    imageInactive: "/assets/images/pokedex/inactive/8-inactive.png",
  },
  {
    id: 9,
    name: "Blastoise",
    description: "The rocket cannons on its shell fire jets of water capable of punching holes through thick steel. It crushes its foes under its heavy body.",
    imageActive: "/assets/images/pokedex/active/9-active.png",
    imageInactive: "/assets/images/pokedex/inactive/9-inactive.png",
  },
  {
    id: 10,
    name: "Caterpie",
    description: "Its short feet are tipped with suction pads that enable it to climb steep surfaces. It releases a stench from its antenna to repel enemies.",
    imageActive: "/assets/images/pokedex/active/10-active.png",
    imageInactive: "/assets/images/pokedex/inactive/10-inactive.png",
  },
  {
    id: 11,
    name: "Metapod",
    description: "This is its pre-evolved form. A steel-hard shell protects its tender body while it prepares to evolve inside.",
    imageActive: "/assets/images/pokedex/active/11-active.png",
    imageInactive: "/assets/images/pokedex/inactive/11-inactive.png",
  },
  {
    id: 12,
    name: "Butterfree",
    description: "In battle, it flaps its wings at great speed to release highly toxic dust into the air. Its wings are covered with poisonous powders.",
    imageActive: "/assets/images/pokedex/active/12-active.png",
    imageInactive: "/assets/images/pokedex/inactive/12-inactive.png",
  },
  {
    id: 13,
    name: "Weedle",
    description: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head to defend against enemies.",
    imageActive: "/assets/images/pokedex/active/13-active.png",
    imageInactive: "/assets/images/pokedex/inactive/13-inactive.png",
  },
  {
    id: 14,
    name: "Kakuna",
    description: "Almost incapable of moving, this Pokemon can only harden its shell to protect itself from predators. It waits motionless inside its hard shell.",
    imageActive: "/assets/images/pokedex/active/14-active.png",
    imageInactive: "/assets/images/pokedex/inactive/14-inactive.png",
  },
  {
    id: 15,
    name: "Beedrill",
    description: "Flies at high speed and attacks using its large venomous stingers on its forelegs and tail. It is extremely territorial and aggressive.",
    imageActive: "/assets/images/pokedex/active/15-active.png",
    imageInactive: "/assets/images/pokedex/inactive/15-inactive.png",
  },
  {
    id: 16,
    name: "Pidgey",
    description: "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand and evade predators.",
    imageActive: "/assets/images/pokedex/active/16-active.png",
    imageInactive: "/assets/images/pokedex/inactive/16-inactive.png",
  },
  {
    id: 17,
    name: "Pidgeotto",
    description: "Very protective of its sprawling territory, this Pokemon will fiercely peck at any intruder. It has outstanding vision for spotting prey.",
    imageActive: "/assets/images/pokedex/active/17-active.png",
    imageInactive: "/assets/images/pokedex/inactive/17-inactive.png",
  },
  {
    id: 18,
    name: "Pidgeot",
    description: "When hunting, it skims the surface of water at high speed to pick off unwary prey. This Pokemon has a dazzling plumage of beautifully glossy feathers.",
    imageActive: "/assets/images/pokedex/active/18-active.png",
    imageInactive: "/assets/images/pokedex/inactive/18-inactive.png",
  },
  {
    id: 19,
    name: "Rattata",
    description: "Bites anything when it attacks. Small and very quick, it is a common sight in many places where it gnaws on hard objects.",
    imageActive: "/assets/images/pokedex/active/19-active.png",
    imageInactive: "/assets/images/pokedex/inactive/19-inactive.png",
  },
  {
    id: 20,
    name: "Raticate",
    description: "It uses its whiskers to maintain balance and will slow down if they are cut off. Its fangs never stop growing, so it gnaws to keep them in check.",
    imageActive: "/assets/images/pokedex/active/20-active.png",
    imageInactive: "/assets/images/pokedex/inactive/20-inactive.png",
  },
  {
    id: 21,
    name: "Spearow",
    description: "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne and is very aggressive.",
    imageActive: "/assets/images/pokedex/active/21-active.png",
    imageInactive: "/assets/images/pokedex/inactive/21-inactive.png",
  },
  {
    id: 22,
    name: "Fearow",
    description: "With its huge and magnificent wings, it can keep aloft without ever having to land. A Pokemon that dates back many years and is known for its sharp beak.",
    imageActive: "/assets/images/pokedex/active/22-active.png",
    imageInactive: "/assets/images/pokedex/inactive/22-inactive.png",
  },
  {
    id: 23,
    name: "Ekans",
    description: "Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole by unhinging its jaw.",
    imageActive: "/assets/images/pokedex/active/23-active.png",
    imageInactive: "/assets/images/pokedex/inactive/23-inactive.png",
  },
  {
    id: 24,
    name: "Arbok",
    description: "The pattern on its belly appears to be a frightening face that intimidates weak foes. It is rumored to have several different patterns.",
    imageActive: "/assets/images/pokedex/active/24-active.png",
    imageInactive: "/assets/images/pokedex/inactive/24-inactive.png",
  },
  {
    id: 25,
    name: "Pikachu",
    description: "When several of these Pokemon gather, their electricity can build and cause lightning storms. It raises its tail to check its surroundings.",
    imageActive: "/assets/images/pokedex/active/25-active.png",
    imageInactive: "/assets/images/pokedex/inactive/25-inactive.png",
  },
  {
    id: 26,
    name: "Raichu",
    description: "Its long tail serves as a ground to protect itself from its own high voltage power. It can unleash electric shocks exceeding 100,000 volts.",
    imageActive: "/assets/images/pokedex/active/26-active.png",
    imageInactive: "/assets/images/pokedex/inactive/26-inactive.png",
  },
  {
    id: 27,
    name: "Sandshrew",
    description: "Burrows deep underground in arid locations far from water. It only emerges to hunt for food and curls into a ball to protect itself.",
    imageActive: "/assets/images/pokedex/active/27-active.png",
    imageInactive: "/assets/images/pokedex/inactive/27-inactive.png",
  },
  {
    id: 28,
    name: "Sandslash",
    description: "Curls up into a spiny ball when threatened. The spikes on its back are harder than steel and can shred anything that touches it.",
    imageActive: "/assets/images/pokedex/active/28-active.png",
    imageInactive: "/assets/images/pokedex/inactive/28-inactive.png",
  },
  {
    id: 29,
    name: "Nidoran♀",
    description: "Although small, its venomous barbs render this Pokemon dangerous. The female has smaller horns but is better at defending and nurturing its young.",
    imageActive: "/assets/images/pokedex/active/29-active.png",
    imageInactive: "/assets/images/pokedex/inactive/29-inactive.png",
  },
  {
    id: 30,
    name: "Nidorina",
    description: "The female's horn develops slowly. Prefers physical attacks such as clawing and biting and emits ultrasonic cries to confuse enemies.",
    imageActive: "/assets/images/pokedex/active/30-active.png",
    imageInactive: "/assets/images/pokedex/inactive/30-inactive.png",
  },
  {
    id: 31,
    name: "Nidoqueen",
    description: "Its hard scales provide strong protection. It uses its powerful body to execute dynamic attacks and protect its young at all costs.",
    imageActive: "/assets/images/pokedex/active/31-active.png",
    imageInactive: "/assets/images/pokedex/inactive/31-inactive.png",
  },
  {
    id: 32,
    name: "Nidoran♂",
    description: "Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom and the male is more aggressive than the female.",
    imageActive: "/assets/images/pokedex/active/32-active.png",
    imageInactive: "/assets/images/pokedex/inactive/32-inactive.png",
  },
  {
    id: 33,
    name: "Nidorino",
    description: "An aggressive Pokemon that is quick to attack. The horn on its head secretes a powerful venom that can pierce through diamond-hard objects.",
    imageActive: "/assets/images/pokedex/active/33-active.png",
    imageInactive: "/assets/images/pokedex/inactive/33-inactive.png",
  },
  {
    id: 34,
    name: "Nidoking",
    description: "It uses its powerful tail in battle to smash, constrict, then break the prey's bones. One swing of its mighty tail can snap a telephone pole in two.",
    imageActive: "/assets/images/pokedex/active/34-active.png",
    imageInactive: "/assets/images/pokedex/inactive/34-inactive.png",
  },
  {
    id: 35,
    name: "Clefairy",
    description: "Its magical and cute appeal has many admirers. It is rare and found only in certain areas and gathers on moonlit nights to dance.",
    imageActive: "/assets/images/pokedex/active/35-active.png",
    imageInactive: "/assets/images/pokedex/inactive/35-inactive.png",
  },
  {
    id: 36,
    name: "Clefable",
    description: "A timid fairy Pokemon that is rarely seen. It runs and hides the moment it senses people and has acute hearing that lets it hear a pin drop.",
    imageActive: "/assets/images/pokedex/active/36-active.png",
    imageInactive: "/assets/images/pokedex/inactive/36-inactive.png",
  },
  {
    id: 37,
    name: "Vulpix",
    description: "At the time of birth, it has just one tail. The tail splits from its tip as it grows older and can control balls of fire.",
    imageActive: "/assets/images/pokedex/active/37-active.png",
    imageInactive: "/assets/images/pokedex/inactive/37-inactive.png",
  },
  {
    id: 38,
    name: "Ninetales",
    description: "Very smart and vengeful, it is said to live for 1,000 years. Grabbing one of its many tails could result in a 1,000-year curse.",
    imageActive: "/assets/images/pokedex/active/38-active.png",
    imageInactive: "/assets/images/pokedex/inactive/38-inactive.png",
  },
  {
    id: 39,
    name: "Jigglypuff",
    description: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep. Its vocal cords can freely adjust the wavelength of its voice.",
    imageActive: "/assets/images/pokedex/active/39-active.png",
    imageInactive: "/assets/images/pokedex/inactive/39-inactive.png",
  },
  {
    id: 40,
    name: "Wigglytuff",
    description: "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size to intimidate opponents.",
    imageActive: "/assets/images/pokedex/active/40-active.png",
    imageInactive: "/assets/images/pokedex/inactive/40-inactive.png",
  },
  {
    id: 41,
    name: "Zubat",
    description: "Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets even in total darkness.",
    imageActive: "/assets/images/pokedex/active/41-active.png",
    imageInactive: "/assets/images/pokedex/inactive/41-inactive.png",
  },
  {
    id: 42,
    name: "Golbat",
    description: "Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly. Its fangs are hollow like straws.",
    imageActive: "/assets/images/pokedex/active/42-active.png",
    imageInactive: "/assets/images/pokedex/inactive/42-inactive.png",
  },
  {
    id: 43,
    name: "Oddish",
    description: "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds and absorbs moonlight to grow.",
    imageActive: "/assets/images/pokedex/active/43-active.png",
    imageInactive: "/assets/images/pokedex/inactive/43-inactive.png",
  },
  {
    id: 44,
    name: "Gloom",
    description: "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey and smells incredibly foul.",
    imageActive: "/assets/images/pokedex/active/44-active.png",
    imageInactive: "/assets/images/pokedex/inactive/44-inactive.png",
  },
  {
    id: 45,
    name: "Vileplume",
    description: "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up causing it to stagger.",
    imageActive: "/assets/images/pokedex/active/45-active.png",
    imageInactive: "/assets/images/pokedex/inactive/45-inactive.png",
  },
];
