export type StylePair = [string, string];
export type StylesMap = { [key: string]: string };

export interface ITemplateImplementation {
  (props?: Object): ValidStyleType;
}

export type ValidStyleType = [string, ...string[]];
export type ValidTemplateEvalType = (...args: any[]) => string | ValidStyleType;
export type TeplateArgsWithFunc = ValidTemplateEvalType | string | ValidStyleType;
export type TemplateArgsWithoutFunc = string | ValidStyleType;

export interface IStringTemplate {
  (
    strings: TemplateStringsArray,
    ...values: any[]
  ): ValidStyleType;
}
