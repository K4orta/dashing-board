import { random } from 'lodash';
const videos = [
  'njCDZWTI-xg', // space
  'hSn-kT2pFe8', // alaska
  'ULXAmaGp6tc', // alaska2
  'zFNpNuaxcCY', // reef cam
  'FdlkTtv-3qk', // penguin cam
  'TStjLJIc3DY', // shark cam
  '1uOY712rY9o', // waimea
  'IBjXjXdrUH8', // santa monica
  'QqKtm6_WvAI', // turtle bay
  '898m3IoMDJc', // pipline
  'eGhh5DF2bKo', // bison
  'QxW7BkocO5A' // river cam
];

export default () => {
  return videos[random(videos.length-1)];
}
