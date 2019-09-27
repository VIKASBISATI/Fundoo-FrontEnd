import React from 'react';
import {
    shallow
} from 'enzyme';
import Register from '../components/registerComponent.jsx';
import '../setupTest'
/**
* describe what we are testing
**/
describe('Register Component', () => {
    /**
    * make our assertion and what we expect to happen 
    **/
    it('should render without throwing an error', () => {
        expect(shallow(< Register />).exists()).toBe(true)
    })
    /**
    * within the Register components describe function
    **/
    it('renders a FirstName input', () => {
        expect(shallow(< Register />).find('#firstName').length).toEqual(1)
    })
    it('renders a LastName input', () => {
        expect(shallow(< Register />).find('#lastName').length).toEqual(1)
    })
    it('renders a email input', () => {
        expect(shallow(< Register />).find('#email').length).toEqual(1)
    })
    it('renders a password input', () => {
        expect(shallow(< Register />).find('#password').length).toEqual(1)
    })
    it('renders a confirmpassword input', () => {
        expect(shallow(< Register />).find('#confirmpassword').length).toEqual(1)
    })
    /**
    * within the Register components describe function
    **/

    describe('FirstName input', () => {
        it('should respond to change event and change the state of the Register Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#firstName')
                .simulate('change', {
                    target: {
                        name: 'firstName',
                        value: 'vikassai'
                    }
                });
            expect(wrapper.state('firstName')).toEqual('vikassai');
        })
    })
    describe('LastName input', () => {
        it('should respond to change event and change the state of the Register Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#lastName')
                .simulate('change', {
                    target: {
                        name: 'lastName',
                        value: 'bisati'
                    }
                });
            expect(wrapper.state('lastName')).toEqual('bisati');
        })
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Register Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#email')
                .simulate('change', {
                    target: {
                        name: 'email',
                        value: 'abcde@gmail.com'
                    }
                });
            expect(wrapper.state('email')).toEqual('abcde@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Register Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'password',
                        value: '12345678'
                    }
                });
            expect(wrapper.state('password')).toEqual('12345678');
        })
    })
    describe('Confirm Password input', () => {
        it('should respond to change event and change the state of the Register Component', () => {
            const wrapper = shallow(< Register />);
            wrapper.find('#confirmpassword')
                .simulate('change', {
                    target: {
                        name: 'confirmpassword',
                        value: '12345678'
                    }
                });
            expect(wrapper.state('confirmpassword')).toEqual('12345678');
        })
    })
})