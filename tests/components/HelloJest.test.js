import React from 'react'
import renderer from 'react-test-renderer'
import HelloJest from '../../src/components/HelloJest'


it( 'renders the component!', () => {
   const component = renderer.create(
     <HelloJest/>
   );
   expect(component).toMatchSnapshot();
});
