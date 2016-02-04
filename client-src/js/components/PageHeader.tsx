/// <reference path="../../../typings/tsd.d.ts"/>

"use strict";

import * as React from "react";

export interface IPageHeaderProps extends React.Props<any> {
  content: string
}

class PageHeader extends React.Component<IPageHeaderProps, any> {

  static propTypes: React.ValidationMap<any> = {
    content: React.PropTypes.string.isRequired
  };

  constructor(props: IPageHeaderProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {content} = this.props;

    return (
      <h1 className="page-header">{content}</h1>
    );
  }
}

export default PageHeader;