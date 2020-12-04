/** @format */

import * as React from 'react'
import ErrorBoundry from '../../ErrorBoundary'
import Helle from '../../view/Hello'

export default class App extends React.Component {
    render() {
        return (
            <ErrorBoundry>
                <Helle name={'coder'} />
            </ErrorBoundry>
        )
    }
}
