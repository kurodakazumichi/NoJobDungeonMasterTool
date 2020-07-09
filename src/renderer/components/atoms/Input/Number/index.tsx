/******************************************************************************
 * Imports
 *****************************************************************************/
import * as React from 'react';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import ClassNames from 'classnames';
import './styles.scss'

/******************************************************************************
 * enum
 *****************************************************************************/
export enum Style {
  None,
  Basic1,
  PlainText,
}

/******************************************************************************
 * Interface
 *****************************************************************************/
/** Props */
export interface IProps {
  /** 初期値 */
  value?:number,
  /** プレースホルダー */
  placeholder?:string,
  /** 内容が変更された時のコールバック */
  onChange?:(value:number, event:React.ChangeEvent<HTMLInputElement>) => void,
  /** フォーカスされた時のコールバック */
  onFocus?:(value:number, event:React.FocusEvent<HTMLInputElement>) => void,
  /** フォーカスが外れた時のコールバック */
  onBlur?:(value:number, event:React.FocusEvent<HTMLInputElement>) => void,
  /** KeyDown時のコールバック */
  onKeyDown?:(event:React.KeyboardEvent<HTMLInputElement>, value:number) => void,
  /** style */
  style?:Style,
  /** 無効かどうか */
  disabled?:boolean,
  /** Adding to class Name of wrapper element. */
  addClass?:string,
  /** 入力できる最小値を指定する */
  min?:number,
  /** 入力できる最大値を指定する */
  max?:number,  
}

/******************************************************************************
 * InputNumberコンポーネント
 *****************************************************************************/
@observer
export default class MyNumber extends React.Component<IProps>
{
  static defaultProps:IProps = {
    value        :0,
    placeholder  :"",
    onChange     :() => undefined,
    onFocus      :() => undefined,
    onBlur       :() => undefined,
    onKeyDown    :() => undefined,
    style        :Style.Basic1,
    disabled     :false,
    addClass     :"",
  }

  constructor(props:IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    return (
      <input 
        className={this.className}
        type="number"
        value={this.props.value} 
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        placeholder={this.props.placeholder}
        disabled={!!this.props.disabled}
        min={this.props.min}
        max={this.props.max}
      />
    )
  }

  private get className() {
    return ClassNames(
      "a-inputText",
      this.styleName,
      this.props.addClass
    )
  }

  private get styleName() {
    switch(this.props.style) {
      case Style.Basic1: return "basic1";
      case Style.PlainText: return "plainText";
      default: return "";
    }
  }

  /** Inputの内容が変更された時のコールバック */
  private onChange(e:React.ChangeEvent<HTMLInputElement>) 
  {
    // 入力値取得
    const value = this.cast(e.target.value);
    
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }
  }

  /** Focusされた時のコールバック */
  private onFocus(e:React.FocusEvent<HTMLInputElement>) {
    if (this.props.onFocus) {
      this.props.onFocus(this.cast(e.target.value), e);
    }
  }

  /** Focusが外れた時のコールバック */
  private onBlur(e:React.FocusEvent<HTMLInputElement>) {
    if (this.props.onBlur) {
      this.props.onBlur(this.cast(e.target.value), e);
    }
  }

  /** KeyDown時のコールバック */
  private onKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.onKeyDown) {
      const { value } = this.props;
      this.props.onKeyDown(e, (value)? value:0);
    }
  }

  private cast(value:string) {
    return Number(value);
  }

}