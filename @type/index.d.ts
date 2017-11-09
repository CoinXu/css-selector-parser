/**
 * Created by asd on 17-9-23.
 */
export  = parser
export as namespace parser

declare namespace parser {

  // =================
  // interface
  // =================
  interface Token {
    selector: string
    entire_selector: string
    id: string | null
    tag_name: string | null
    class_name: string[]
    nth_child: string | null
    attributes: string[]
  }

  interface TokenStruct extends Token {
    children?: Token
    inside?: Token
    after?: Token
    precede?: Token
    undef?: Token
  }

  // ===============
  // exports
  // ===============
  export function parse (selector: string): TokenStruct
  export function combine (token: TokenStruct): string

  // ==============
  // utils
  // ==============
  export function separator (selector: string): string[]
  export function extract_id (select: string): string | null
  export function extract_class (selector: string): string[]
  export function extract_tag_name (selector: string): string | null
  export function extract_nth (selector: string): string | null
  export function extract_attr (selector: string): string[]

  // ==============
  // regulation
  // ==============

  export namespace Regulation {
    export function creator (regulation: string): RegExp
    export function test (str: string, regulation: string): boolean
    export function max_directory (regulations: string[]): string[]
    export function max_length (regulations: string[]): string[]
    export function match (str: string, regulations: string[]): string[]
    export function exec (str: string, regulations: string[]): string | null
  }
}
