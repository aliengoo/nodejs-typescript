/// <reference path="../../../typings/tsd.d.ts"/>
"use strict";

import * as React from "react";
import Row from "./Row";

export interface ILayoutContentProps extends React.Props<any> {
}

class LayoutContent extends React.Component<ILayoutContentProps, any> {
  constructor(props: ILayoutContentProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Row>
        <div className="layout-content">
          {this.props.children}
        </div>
      </Row>
    );
  }
}

export default LayoutContent;