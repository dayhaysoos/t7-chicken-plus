import createConstants from 'namespace-constants'
import one from '../../assets/images/inputs/1.png'
import onePlusTwo from '../../assets/images/inputs/1plus2.png'
import onePlusTwoPlusThree from '../../assets/images/inputs/1plus2plus3.png'
import onePlusTwoPlusThreePlusFour from '../../assets/images/inputs/1plus2plus3plus4.png'
import onePlusTwoPlusFour from '../../assets/images/inputs/1plus2plus4.png'
import onePlusFour from '../../assets/images/inputs/1plus4.png'
import onePlusThree from '../../assets/images/inputs/1plus3.png'
import onePlusThreePlusFour from '../../assets/images/inputs/1plus3plus4.png'

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
import d_h from '../../assets/images/inputs/d_h.png'
import d from '../../assets/images/inputs/d.png'
import db_h from '../../assets/images/inputs/db_h.png'
import db from '../../assets/images/inputs/db.png'
import df_h from '../../assets/images/inputs/df_h.png'
import df from '../../assets/images/inputs/df.png'
import f_h from '../../assets/images/inputs/f_h.png'
import f from '../../assets/images/inputs/f.png'
import u_h from '../../assets/images/inputs/u_h.png'
import u from '../../assets/images/inputs/u.png'
import uf_h from '../../assets/images/inputs/uf_h.png'
import uf from '../../assets/images/inputs/uf.png'
import ub_h from '../../assets/images/inputs/ub_h.png'
import ub from '../../assets/images/inputs/ub.png'

// just frame
import star from '../../assets/images/inputs/star.png'



export const INPUT_IMAGES = createConstants([
    '1',
    '1+2',
    '1+2+3',
    '1+2+4',
    '1+3',
    '1+4',
    '1+3+4',
    '2',
    '2+3',
    '2+3+4',
    '2+4',
    '3',
    '3+4',
    '4',
    'B',
    'b',
    'F',
    'f',
    'd',
    'D',
    'd/b',
    'D/B',
    'd/f',
    'D/F',
    'd',
    'D',
    'u/b',
    'U/B',
    'u/f',
    'U/F',
    ':'
]);

export const INPUT = {
    [INPUT_IMAGES['1']]: one,
    [INPUT_IMAGES['1+2']]: onePlusTwo,
    [INPUT_IMAGES['1+2+3']]: onePlusTwoPlusThree,
    [INPUT_IMAGES['1+2+3+4']]: onePlusTwoPlusThreePlusFour,
    [INPUT_IMAGES['1+2+4']]: onePlusTwoPlusFour,
    [INPUT_IMAGES['1+3']]: onePlusThree,
    [INPUT_IMAGES['1+4']]: onePlusFour,
    [INPUT_IMAGES['1+3+4']]: onePlusThreePlusFour,
    [INPUT_IMAGES['2']]: two,
    [INPUT_IMAGES['2+3']]: twoPlusThree,
    [INPUT_IMAGES['2+3+4']]: twoPlusThreePlusFour,
    [INPUT_IMAGES['2+4']]: twoPlusFour,
    [INPUT_IMAGES['3']]: three,
    [INPUT_IMAGES['3+4']]: threePlusFour,
    [INPUT_IMAGES['4']]: four,
    [INPUT_IMAGES['b']]: b,
    [INPUT_IMAGES['B']]: b_h,
    [INPUT_IMAGES['d']]: d,
    [INPUT_IMAGES['D']]: d_h,
    [INPUT_IMAGES['d/b']]: db,
    [INPUT_IMAGES['D/B']]: db_h,
    [INPUT_IMAGES['d/f']]: df,
    [INPUT_IMAGES['D/F']]: df_h,
    [INPUT_IMAGES['f']]: f,
    [INPUT_IMAGES['F']]: f_h,
    [INPUT_IMAGES['u']]: u,
    [INPUT_IMAGES['U']]: u_h,
    [INPUT_IMAGES['u/f']]: uf,
    [INPUT_IMAGES['U/F']]: uf_h,
    [INPUT_IMAGES['u/b']]: ub,
    [INPUT_IMAGES['U/B']]: ub_h,
    [INPUT_IMAGES[':']]: star,
}




