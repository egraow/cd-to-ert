/**
 * ERT Cooldown Conversion
 *
 * Author: Pastures#0001 (@egraow) 
 *
 * Syntax: 
 *    =RAID_CD(timestamp, caster, spell)
 *
 * Example:
 *    =RAID_CD(A1, B1, C1)
 *    [ A1 == "1:12", B1 == "Yepdh", C1 == "Dark" ]
 *    
 *    Output: 1:12 - |cffA330C9Yepdh|r - {spell:196718}
 *
 * Expansion:
 *    Create a new property in CD_IDS
 *        ex: "aura mastery": {id: 100000, class: CLASSES.paladin},
 *    
 *    Create any number of new properties in CD_ALIASES linking to the property in CD_IDS  
 *        ex: "aura mastery": CD_IDS["aura_mastery"],
 *            "am": CD_IDS["aura_mastery"],
 */


const COLOR_PREFIX = "|cff"
const COLOR_SUFFIX = "|r"

const CLASSES = {
  warrior: {ertName: "Warrior", color: "C79C6E"},
  paladin: {ertName: "Paladin", color: "F58CBA",},
  priest:  {ertName: "Priest", color: "FFFFFF"},
  dk:      {ertName: "Death Knight", color: "C41F3B"},
  shaman:  {ertName: "Shaman", color: "0070DE"},
  druid:   {ertName: "Druid", color: "FF7D0A"},
  dh:      {ertName: "Demon Hunter", color: "A330C9"},
  rogue:   {ertName: "Rogue", color: "FFF569"},
  warlock: {ertName: "Warlock", color: "8787ED"},
  mage:    {ertName: "Mage", color: "40C7EB"},
  hunter:  {ertName: "Hunter", color: "A9D271"}
}

const CD_IDS = {
  // warriors
  "rallying cry": {id: 97462, class: CLASSES.warrior},
  
  // paladins
  "aura mastery":   {id: 31821, class: CLASSES.paladin},
  "avenging wrath": {id: 31884, class: CLASSES.paladin},

  // priests
  "divine hymn":          {id: 64843, class: CLASSES.priest},
  "power word: barrier":  {id: 62618, class: CLASSES.priest},
  "vampiric embrace":     {id: 15286, class: CLASSES.priest},
  "holy word: salvation": {id: 265202, class: CLASSES.priest},
  "evangelism":           {id: 246287, class: CLASSES.priest},
  "rapture":              {id: 47536, class: CLASSES.priest},
  "spirit shell":         {id: 109964, class: CLASSES.priest},
  
  // dks
  "anti-magic zone": {id: 51052, class: CLASSES.dk},
  
  // shamans
  "healing tide totem":         {id: 108280, class: CLASSES.shaman},
  "spirit link totem":          {id: 98008, class: CLASSES.shaman},
  "ancestral protection totem": {id: 207399, class: CLASSES.shaman},

  // monks
  "revival": {id: 115310, class: CLASSES.monk},
  
  // druids
  "tranquility": {id: 740, class: CLASSES.druid},
  
  // dhs
  "darkness": {id: 196718, class: CLASSES.dh},
}

const CD_ALIASES = {
  // warriors
  "rallying cry": CD_IDS["rallying cry"],
  "rally":        CD_IDS["rallying cry"],
  
  // paladins
  "aura mastery":   CD_IDS["aura mastery"],
  "am":             CD_IDS["aura mastery"],
  "devo":           CD_IDS["aura mastery"],
  "devotion aura":  CD_IDS["aura mastery"],
  "avenging wrath": CD_IDS["avenging wrath"],
  "aw":             CD_IDS["avenging wrath"],
  "wings":          CD_IDS["avenging wrath"],
  
  // priests
  "divine hymn":          CD_IDS["divine hymn"],
  "dh":                   CD_IDS["divine hymn"],
  "hymn":                 CD_IDS["divine hymn"],
  "power word: barrier":  CD_IDS["power word: barrier"],
  "pwb":                  CD_IDS["power word: barrier"],
  "pw:b":                 CD_IDS["power word: barrier"],
  "barrier":              CD_IDS["power word: barrier"],
  "vampiric embrace":     CD_IDS["vampiric embrace"],
  "ve":                   CD_IDS["vampiric embrace"],
  "vamp":                 CD_IDS["vampiric embrace"],
  "embrace":              CD_IDS["vampiric embrace"],
  "holy word: salvation": CD_IDS["holy word: salvation"],
  "salv":                 CD_IDS["holy word: salvation"],
  "salvation":            CD_IDS["holy word: salvation"],
  "hws":                  CD_IDS["holy word: salvation"],
  "hw:s":                 CD_IDS["holy word: salvation"],
  "spirit shell":         CD_IDS["spirit shell"],
  "ss":                   CD_IDS["spirit shell"],
  "shell":                CD_IDS["spirit shell"],
  "evangelism":           CD_IDS["evangelism"],
  "evang":                CD_IDS["evangelism"],
  "evange":               CD_IDS["evangelism"],
  "rapture":              CD_IDS["rapture"],
  "rapt":                 CD_IDS["rapture"],
  
  
  // dks
  "anti-magic zone": CD_IDS["anti-magic zone"],
  "antimagic zone":  CD_IDS["anti-magic zone"],
  "amz":             CD_IDS["anti-magic zone"],
  
  // shamans
  "healing tide totem":         CD_IDS["healing tide totem"],
  "healing tide":               CD_IDS["healing tide totem"],
  "htt":                        CD_IDS["healing tide totem"],
  "spirit link totem":          CD_IDS["spirit link totem"],
  "spirit link":                CD_IDS["spirit link totem"], 
  "sl":                         CD_IDS["spirit link totem"],
  "slt":                        CD_IDS["spirit link totem"],
  "link":                       CD_IDS["spirit link totem"],
  "ancestral protection totem": CD_IDS["ancestral protection totem"],
  "apt":                        CD_IDS["ancestral protection totem"],
  
  // druids
  "tranquility": CD_IDS["tranquility"],
  "tranq":       CD_IDS["tranquility"],
  
  // dhs
  "darkness": CD_IDS["darkness"],
  "dark":     CD_IDS["darkness"],
}


function RAID_CD(timestamp, caster, spell) {
  const spacer = " - ";
  let spellRef;
  let ret = "";
  
  if (!timestamp || !spell || !caster) return;
  spell = spell.toLowerCase();
  spellRef = CD_ALIASES[spell];
  
  // step 1: insert timestamp
  // step 2: if spell exists, grab class color. if not, no format.
  // step 3: if spell exists, print ERT-compatible spell tag, if not, print spreadsheet's string.
  
  ret += (timestamp + spacer);
  if (spellRef) ret += `${COLOR_PREFIX}${spellRef.class.color}`;
  ret += `${caster}`;
  if (spellRef) ret += `${COLOR_SUFFIX}`;
  ret += spacer;
  ret += (spellRef ? `{spell:${spellRef.id}}` : spell);
  
  return ret;
}
