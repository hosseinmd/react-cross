import PureComponent from "../pureComponent";

declare class Page extends PureComponent {
  didBlur(): void;
  willBlur(): void;
  didFocus(): void;
  willFocus(): void;
}
export default Page;
