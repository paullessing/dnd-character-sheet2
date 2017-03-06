export type Alignment =
  'Lawful Good'
    | 'Lawful Neutral'
    | 'Lawful Evil'
    | 'Neutral Good'
    | 'True Neutral'
    | 'Neutral Evil'
    | 'Chaotic Good'
    | 'Chaotic Neutral'
    | 'Chaotic Evil';

export class Alignments {
  constructor() {
    throw new Error('Cannot instantiate enum');
  }

  public static LAWFUL_GOOD: Alignment    = 'Lawful Good';
  public static LAWFUL_NEUTRAL: Alignment = 'Lawful Neutral';
  public static LAWFUL_EVIL: Alignment    = 'Lawful Evil';
  public static NEUTRAL_GOOD: Alignment   = 'Neutral Good';
  public static TRUE_NEUTRAL: Alignment   = 'True Neutral';
  public static NEUTRAL_EVIL: Alignment   = 'Neutral Evil';
  public static CHAOTIC_GOOD: Alignment   = 'Chaotic Good';
  public static CHAOTIC_NEUTRAL: Alignment = 'Chaotic Neutral';
  public static CHAOTIC_EVIL: Alignment   = 'Chaotic Evil';

}
