import createConstants from 'namespace-constants'
import db from '../../assets/images/inputs/db.png'
import one from '../../assets/images/inputs/1.png'
import onePlusTwo from '../../assets/images/inputs/1plus2.png'
import onePlusTwoPlusThree from '../../assets/images/inputs//1plus2plus3.png'
import onePlusTwoPlusThreePlusFour from '../../assets/images/inputs//1plus2plus3plus4.png'
import onePlusTwoPlusFour from '../../assets/images/inputs//1plus2plus4.png'
import onePlusThree from '../../assets/images/inputs//1plus3.png'
import onePlusThreePlusFour from '../../assets/images/inputs//1plus3plus4.png'

// two 
import two from '../../assets/images/inputs/2.png'
import twoPlusThree from '../../assets/images/inputs/2plus3.png'
import twoPlusThreePlusFour from '../../assets/images/inputs/2plus3plus4.png'
import twoPlusFour from '../../assets/images/inputs/2plus4.png'

// three
import three from '../../assets/images/inputs/3.png'
import threePlusFour from '../../assets/images/inputs/3plus4.png'

// four
import four from '../../assets/images/inputs/4.png'

// directionals
import b_h from '../../assets/images/inputs/b_h.png'
import b from '../../assets/images/inputs/b.png'


export const INPUT_IMAGES = createConstants([
    '1',
    '1+2',
    '1+2+3',
    '1+2+4',
    '1+3',
    '1+3+4',
    'd/b',
    '2',
    '2+3',
    '2+3+4',
    '2+4',
    '3',
    '3+4',
    '4',
    'b_h',
    'b'
]);

export const INPUT = {
    [INPUT_IMAGES['1']]: one,
    [INPUT_IMAGES['1+2']]: onePlusTwo,
    [INPUT_IMAGES['1+2+3']]: onePlusTwoPlusThree,
    [INPUT_IMAGES['1+2+3+4']]: onePlusTwoPlusThreePlusFour,
    [INPUT_IMAGES['1+2+4']]: onePlusTwoPlusFour,
    [INPUT_IMAGES['1+3']]: onePlusThree,
    [INPUT_IMAGES['1+3+4']]: onePlusThreePlusFour,
    [INPUT_IMAGES['2']]: two,
    [INPUT_IMAGES['2+3']]: twoPlusThree,
    [INPUT_IMAGES['2+3+4']]: twoPlusThreePlusFour,
    [INPUT_IMAGES['2+4']]: twoPlusFour,
    [INPUT_IMAGES['3']]: three,
    [INPUT_IMAGES['3+4']]: threePlusFour,
    [INPUT_IMAGES['4']]: four,
    [INPUT_IMAGES['d/b']]: db,
    [INPUT_IMAGES['b']]: b,
    [INPUT_IMAGES['b*']]: b_h,
}




