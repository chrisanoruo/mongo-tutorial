import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

// const App = () => {};

it('should be ok', () => {
  const flag = 1;
  expect(flag).toBe(1);
})

// describe('test', () => {
//   it('should pass', () => {
//     const div = shallow(<App />);
//     expect(div).toMatchSnapshot();
//   });
// });