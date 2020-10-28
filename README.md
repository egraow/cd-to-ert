# cd-to-ert
ERT Cooldown Conversion

Author: Pastures#0001 (@egraow) 

- Syntax: 
    `=RAID_CD(timestamp, caster, spell)`
 
- Example:
    `=RAID_CD(A1, B1, C1)`
    `[ A1 == "1:12", B1 == "Yepdh", C1 == "Dark" ]`
    
Output: 1:12 - |cffA330C9Yepdh|r - {spell:196718}

- Expansion:
    - Create a new property in CD_IDS
        - ex: `"aura mastery": {id: 100000, class: CLASSES.paladin},`

- Create any number of new properties in CD_ALIASES linking to the property in CD_IDS  
    - ex: `"aura mastery": CD_IDS["aura_mastery"],`
        - `"am": CD_IDS["aura_mastery"],`
