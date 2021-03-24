import React from 'react';
import Nav from './nav';
import {render} from '@testing-library/react'
import { withRouter } from 'react-router';

describe('nav', ()=>{
    it('should work',()=>{
       const {container, debug} = render(withRouter(<Nav></Nav>));
       debug()
       expect(container).not.toBeNull();
    })
})