import * as momentWrapper from 'moment';
import MomentStatic = moment.MomentStatic;
const moment: MomentStatic = (momentWrapper as any).default as MomentStatic;

export {
    moment,
    MomentStatic
}