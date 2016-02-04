/// <reference path="../../../../typings/tsd.d.ts"/>
"use strict";

import * as React from "react";

// components
import LayoutContent from "../../components/LayoutContent";
import PageHeader from "../../components/PageHeader";

export interface IMovieViewProps extends React.Props<any> {
  // TODO: Props
}

class MovieView extends React.Component<IMovieViewProps, any> {
  constructor(props: IMovieViewProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="movie-view">
        <LayoutContent>
          <PageHeader content="Movies"/>
        </LayoutContent>
      </div>
    );
  }
}

export default MovieView;