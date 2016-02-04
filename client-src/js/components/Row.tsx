/// <reference path="../../../typings/tsd.d.ts"/>
"use strict";

import * as React from "react";

export interface IRowProps extends React.Props<any> {
  // TODO: Props
}

class Row extends React.Component<IRowProps, any> {
  constructor(props: IRowProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="row">{this.props.children}</div>
    );
  }
}

export default Row;