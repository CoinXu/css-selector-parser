import {Token, TokenStruct, parse, combine, Regulation} from './index'

const strct: TokenStruct = parse('');
const token: string = combine(strct);
const reg: RegExp = Regulation.creator('');
const test: boolean = Regulation.test('', '');
const max_dir = Regulation.max_directory(['']);
const max_len = Regulation.max_length(['']);
const matched: string[] = Regulation.match('', []);
const exec: string = <string>Regulation.exec('', []);
const exec: null = <null>Regulation.exec('', []);