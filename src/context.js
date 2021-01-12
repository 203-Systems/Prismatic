import React, { createContext, Component } from "react";
import config from "../config";
import deviceConfigs from "../deviceConfigs";

export const Context = createContext();

export const projectFile = createContext();

export const midiInput = createContext();
export const midiOutput = createContext();

export const layoutConfigName = createContext(config.defaultLayout);
export const layoutConfig = createContext(deviceConfigs[config.defaultLayout]);

export const inputDevice = createContext();
export const inputConfigName = createContext();
export const inputConfig = createContext();

export const outputDevice = createContext();
export const outputConfigName = createContext();
export const outputConfig = createContext();


class ContextProvider extends Components
{
  state = {
    projectFile: undefined,

    midiInput: [],
    midiOutput: [],

    layoutConfigName: config.defaultLayout,
    layoutConfig: deviceConfigs[config.defaultLayout],

    inputDevice: undefined,
    inputConfigName: undefined,
    inputConfig: undefined,

    outputDevice: undefined,
    outputConfigName: undefined,
    outputConfig: undefined,
  };

  render()
  {
    return(
      <Context.Provider value={...this}>
        {this.props.children}
      </Context.Provider>
    )
  }
}