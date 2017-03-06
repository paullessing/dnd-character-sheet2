export enum Alignment {
    LawfulGood,
    LawfulNeutral,
    LawfulEvil,
    NeutralGood,
    TrueNeutral,
    NeutralEvil,
    ChaoticGood,
    ChaoticNeutral,
    ChaoticEvil
}

var _AlignmentNames = [];
_AlignmentNames[Alignment.LawfulGood]    = 'Lawful Good';
_AlignmentNames[Alignment.LawfulNeutral] = 'Lawful Neutral';
_AlignmentNames[Alignment.LawfulEvil]    = 'Lawful Evil';
_AlignmentNames[Alignment.NeutralGood]   = 'Neutral Good';
_AlignmentNames[Alignment.TrueNeutral]   = 'True Neutral';
_AlignmentNames[Alignment.NeutralEvil]   = 'Neutral Evil';
_AlignmentNames[Alignment.ChaoticGood]   = 'Chaotic Good';
_AlignmentNames[Alignment.ChaoticNeutral] = 'Chaotic Neutral';
_AlignmentNames[Alignment.ChaoticEvil]   = 'Chaotic Evil';

export const AlignmentNames = _AlignmentNames;