
/******************************************************************************
 * import area
 *****************************************************************************/
import * as React from 'react';
import ClassNames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css'
import { observer } from 'mobx-react';

/******************************************************************************
 *  Enum
 *****************************************************************************/
/** Iconのスタイル */
export enum Style {
  /** 黒塗り */
  Solid, 
  /** 中抜き */
  Regular,
  /** ブランド */
  Brand,
}

/** 
 * Iconの種類
 * font-awesomeのアイコン名を列挙型で定義する。
 * https://fontawesome.com/icons?d=gallery&m=free
 */
export enum Type {
  Info                = "info-circle",
  TimesCircle         = "times-circle",
  PlusCircle          = "plus-circle",
  LockOpen            = "lock-open",
  Lock                = "lock",
  ExclamationTriangle = "exclamation-triangle",
}

/******************************************************************************
 * 定数
 *****************************************************************************/
const StyleNames = {
  [Style.Solid]  :"fas",
  [Style.Regular]:"far",
  [Style.Brand]  :"fab",
};

/******************************************************************************
 * Interface
 *****************************************************************************/
/** Icon Props */
export interface IProps {
  /** 黒塗り、中抜き、ブランド系アイコンの指定 */
  style?: Style, 
  /** Iconの種類 */
  type : Type,
  /** 追加のcssクラス名を指定する */
  addClass?:string,
  /** クリック時の処理 */
  onClick?:(event:React.MouseEvent<HTMLElement>) => void;
};

/******************************************************************************
 * Icon Component
 *****************************************************************************/
@observer
export default class Icon extends React.Component<IProps> 
{
  /** props規定値 */
  static defaultProps:IProps = {
    /** アイコンのスタイル */
    style   :Style.Solid,
    type    :Type.Info,
    addClass:"",
    onClick :undefined
  }

  /** コンストラクタ */
  constructor(props:IProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /** 描画 */
  render() {
    return (
      <i className={this.className} onClick={this.onClick}/>
    );
  }

  /** CSSクラス名 */
  private get className() 
  {
    return ClassNames(
      "a-icon",
      StyleNames[this.style],
      `fa-${this.props.type}`,
      this.props.addClass
    );
  }

  /** 
   * Iconの白抜き、黒抜きなどのスタイル
   */
  private get style():Style {
    const {style} = this.props;
    return (style)? style : Style.Solid;
  }

  /** クリック時の処理 */
  private onClick(event:React.MouseEvent<HTMLElement>) {
    const { onClick } = this.props;
    onClick && onClick(event);
  }
}