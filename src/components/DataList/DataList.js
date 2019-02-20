import React from "react";
import UUID from "uuid/v1.js"
import {Card, List, ListItem} from "react-onsenui";

export const DataList = (props) => (props.dataSource ? <Card>
    {props.title ? <h3>{props.title}</h3> : null}
    <List modifier={props.modifier}
          dataSource={props.dataSource}
          renderRow={(row) => (
              <ListItem modifier='longdivider' key={UUID()}>
                  <div>
                      <div className="rowHeader">{row[0]}</div>
                      <div className="rowText">{row[1]} </div>
                  </div>
              </ListItem>
          )}
    />
</Card> : null);
