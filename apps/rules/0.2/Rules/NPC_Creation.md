# NPC/Creature Creation

When creating a [NPC](Definitions/NPC) a [GG](Definitions/Game_Guide) will go through various steps.

## Steps

1. Choose [NPC](Definitions/NPC) descriptors such as [Race](Definitions/Races), height, weight, gender, etc
2. Choose Base [Affinity](#affinity)
3. Choose level
4. Determine NPC Quality
5. Choose Masteries based on quality
6. Choose Equipment based on quality
7. Determine Name
8. Determine loot dropped if any

### Affinity

[Mastery](Masteries/)

#### Potency

+2 Potency & +1 another stat

#### Finesse

+2 Finesse & +1 another stat

#### Vigor

+2 Vigor & +1 another stat

### Choose Level

On a scale of 1-20 choose the level of the NPC. Update their stats based on their level. You don't have to give them the same progression as a normal Hero if you do not want to. For a balanced NPC for their free stat switch between the two off hand stats for each free stat.

All stats start at 1

Potency: 1
Finesse: 1
Vigor: 1

| Level | Affinity Stat | Free Stats | Base HP | Damage Modifier Base | Critical Modifier Base |
| ----- | ------------- | ---------- | ------- | --- | ---|
| 1     | 2             | 1          | 10      | 4 | 4 |
| 2     | 2             | 1          | 15      | 8 | 8 |
| 3     | 3             | 2          | 25      | 14 | 14 |
| 4     | 3             | 2          | 30      | 20 | 20 |
| 5     | 4             | 2          | 40      | 26 | 26 |
| 6     | 4             | 2          | 45      | 32 | 32 |
| 7     | 5             | 3          | 55      | 39 | 39 |
| 8     | 5             | 3          | 60      | 46 | 46 |
| 9     | 6             | 3          | 70      | 53 | 53 |
| 10    | 6             | 3          | 75      | 61 | 61 |
| 11    | 7             | 4          | 85      | 69 | 69 |
| 12    | 7             | 4          | 90      | 78 | 78 |
| 13    | 8             | 4          | 100     | 86 | 86 |
| 14    | 8             | 4          | 105     | 95 | 95 |
| 15    | 9             | 5          | 115     | 104 | 104 |
| 16    | 9             | 5          | 120     | 113 | 113 |
| 17    | 9             | 6          | 130     | 125 | 125 |
| 18    | 9             | 7          | 135     | 135 | 135 |
| 19    | 9             | 8          | 145     | 145 | 145 |
| 20    | 9             | 9          | 150     | 155 | 155|

### Determine NPC Quality

NPC are either:

| Rating    | Bonus Affinity Stats | Bonus Freee Affinity Stats |
| --------- | -------------------- | -------------------------- |
| Common    | 0                    | 0                          |
| Uncommon  | 1                    | 1                          |
| Rare      | 3                    | 2                          |
| Legendary | 7                    | 3                          |

Based on these they get various masteries

### Determine Masteries

| Rating    | Masteries |
| --------- | --------- |
| Common    | <=1       |
| Uncommon  | <=2       |
| Rare      | <=3       |
| Legendary | <=5       |

## Determine Equipment

Give the NPC equipment representative of their quality.

### Name your hero

You must have a name or someway of being identified by others so they can grab your attention in verbal or gesture based way.

### Determine loot

Depending on the setting and the group that surrounds these NPC you can determine what they might drop.

| Rating    | Common Loot % | Uncommon Loot % | Rare Loot % | Legendary Loot % |
| --------- | ------------- | --------------- | ----------- | ---------------- |
| Common    | 1-4           | 5,6             | 0           | 0                |
| Uncommon  | 1-3           | 4-5             | 6           | 0                |
| Rare      | 1             | 2-3             | 4-5         | 6                |
| Legendary | 0             | 1               | 2-4         | 5-6              |
