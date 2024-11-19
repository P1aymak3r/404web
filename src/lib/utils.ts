import classNames from "classnames";

export function cn(...classes: (string | undefined | false)[]): string {
  return classNames(...classes);
}
