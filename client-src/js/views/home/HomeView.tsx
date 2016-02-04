///<reference path="../../../../typings/tsd.d.ts"/>

import * as React from "react";
import LayoutContent from "../../components/LayoutContent";
import PageHeader from "../../components/PageHeader";

interface IHomeViewProps extends React.Props<any> {
}

class HomeView extends React.Component<IHomeViewProps, any> {

  public render(): JSX.Element {
    return (
      <LayoutContent>
        <div className="home-view">
          <PageHeader content="Home"/>
        </div>
      </LayoutContent>
    );
  }
}

export default HomeView;


