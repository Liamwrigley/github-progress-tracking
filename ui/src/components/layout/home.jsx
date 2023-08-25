export const Home = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h2>TODO</h2>
            </div>
            <div className="border-2 border-custom-highlight2 rounded p-2">
                <h2>Auth process - updated deploy@3</h2>
                <ul className="steps steps-vertical">
                    <li className="step">landing auth page (asks to connect with either github or discord)</li>
                    <li className="step">user page - shows details for whatever is linked</li>
                    <li className="step">connect discord</li>
                    <li className="step">
                        <ul className="steps steps-vertical">
                            <li className="step step-primary">connect github</li>
                            <li className="step">auth and save keys</li>
                            <li className="step">get repos and show all to select from</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}