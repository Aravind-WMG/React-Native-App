import React from "react";
import App from "./App";
import { PmpHeaderComponent } from "./app/components/PmpHeaderComponent";
import { PmpCarouselComponent } from "./app/components/PmpCarouselComponent";
import { ProductMatricsComponent } from "./app/components/ProductMatricsComponent";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

it("PmpCarouselComponent renders correctly", () => {
  const rendered = renderer.create(<PmpCarouselComponent />).toJSON();
  expect(rendered).toMatchSnapshot();
});

it("PmpHeaderComponent renders correctly", () => {
  const rendered = renderer.create(<PmpHeaderComponent />).toJSON();
  expect(rendered).toMatchSnapshot();
});

describe("<ProductMatricsComponent />", () => {
  it("it should render 1 view component", () => {
    const wrapper = shallow(<ProductMatricsComponent />);
    expect(wrapper.find(View).length).toBe(1);
  });

  it("it should render 1 ScrollView", () => {
    const wrapper = shallow(<ProductMatricsComponent />);
    expect(wrapper.find(ScrollView).length).toBe(1);
  });

  it("it should render PmpHeaderComponent", () => {
    const wrapper = shallow(<ProductMatricsComponent />);
    expect(wrapper.find(PmpHeaderComponent).length).toBe(1);
  });
});
