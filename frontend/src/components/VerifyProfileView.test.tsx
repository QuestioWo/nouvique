import * as React from 'react';

import { mount, shallow } from 'enzyme';

import { VerifyProfileView, VerifyProfileViewProps } from './VerifyProfileView';
import { MemoryRouter as Router } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';

describe('VerifyProfileView', () => {
	const getProps = (): VerifyProfileViewProps => (
		{
			history: { push: () => { } } as any,
			location: {} as any,
			match: { params: { username: "foo" } as any } as any,
			updateAlertBar: async () => { },
			emptyBasket: () => { },
			addToBasket: () => { },
			removeFromBasket: () => { },
			getBasketItems: () => [],
			getTotalBasketPrice: () => 0,
			checkBasketAvailabilities: async () => { },
			stripePromise: loadStripe("foo"),
			alert: {} as any
		}
	)

	const getComponent = (props: VerifyProfileViewProps) => (
		<VerifyProfileView {...props} />
	);


	it('Should render correctly with shallow', async () => {
		const component = shallow(
			getComponent(getProps())
		);
		expect(component.debug()).toMatchSnapshot();
	});

	it('Should render correctly with mount', async () => {
		// have to include router as will fail with react-router problem due to use of specific functions
		const component = mount(
			<Router>
				{getComponent(getProps())}
			</Router>
		);
		expect(component.debug()).toMatchSnapshot();
	});
});